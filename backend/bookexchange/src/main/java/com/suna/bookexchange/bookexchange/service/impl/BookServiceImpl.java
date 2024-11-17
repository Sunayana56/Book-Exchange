package com.suna.bookexchange.bookexchange.service.impl;

import com.suna.bookexchange.bookexchange.exceptions.ResourceNotFoundException;
import com.suna.bookexchange.bookexchange.model.Book;
import com.suna.bookexchange.bookexchange.repository.BookRepository;
import com.suna.bookexchange.bookexchange.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Page<Book> getBooksForSearch(String query, Pageable pageable) {
        Page<Book> bookList = bookRepository.findByTitleOrAuthorOrGenre(query, query, query, pageable);
        return bookList;
    }

    @Override
    public Page<Book> getAllBooks(Pageable pageable) {
        Page<Book> bookList = bookRepository.findAll(pageable);
        return bookList;
    }

    @Override
    public Book getBookById(String id) {
        return bookRepository.findBookById(id);
    }

    @Override
    public Page<Book> getFilteredBooks(String query, Boolean available, String genre, String location, Pageable pageable) {
        // Calculate offset for pagination
        int offset = pageable.getPageNumber() * pageable.getPageSize();
        int pageSize = pageable.getPageSize();

        // SQL query parts that will be appended conditionally
        StringBuilder sql = new StringBuilder("SELECT * FROM book b WHERE 1=1");

        // List to store parameter values
        List<Object> args = new ArrayList<>();

        // Count the total number of matching books for pagination
        StringBuilder countSql = new StringBuilder("SELECT COUNT(*) FROM book b WHERE 1=1");
        List<Object> countArgs = new ArrayList<>(args);

        // Add search filters if query is not null
        if (query != null && !query.isEmpty()) {
            String appendStatement = " AND (b.title ILIKE CONCAT('%', ?, '%') OR b.author ILIKE CONCAT('%', ?, '%') OR b.genre ILIKE CONCAT('%', ?, '%'))";
            sql.append(appendStatement);
            countSql.append(appendStatement);
            args.add(query);
            args.add(query);
            args.add(query);
            countArgs.add(query);
            countArgs.add(query);
            countArgs.add(query);
        }

        // Add availability filter if available is not null
        if (available != null) {
            String appendStatement = " AND b.is_available = ?";
            sql.append(appendStatement);
            countSql.append(appendStatement);
            args.add(available);
            countArgs.add(available);
        }

        // Add genre filter if genre is not null
        if (genre != null && !genre.isEmpty()) {
            String appendStatement = " AND b.genre = ?";
            sql.append(appendStatement);
            countSql.append(appendStatement);
            args.add(genre);
            countArgs.add(genre);
        }

        // Add location filter if location is not null
        if (location != null && !location.isEmpty()) {
            String appendStatement = " AND b.location ILIKE CONCAT('%', ?, '%')";
            sql.append(appendStatement);
            countSql.append(appendStatement);
            args.add(location);
            countArgs.add(location);
        }

        // Add pagination
        sql.append(" LIMIT ? OFFSET ?");
        args.add(pageSize);
        args.add(offset);

        // Convert the query to a string
        String finalSql = sql.toString();

        // Fetch filtered books
        List<Book> books = jdbcTemplate.query(finalSql, args.toArray(), new RowMapper<Book>() {
            @Override
            public Book mapRow(ResultSet rs, int rowNum) throws SQLException {
                Book book = new Book();
                book.setId(rs.getString("id"));
                book.setTitle(rs.getString("title"));
                book.setAuthor(rs.getString("author"));
                book.setPublisher(rs.getString("publisher"));
                book.setGenre(rs.getString("genre"));
                book.setLanguage(rs.getString("language"));
                book.setPublishYear(rs.getInt("publish_year"));
                book.setDescription(rs.getString("description"));
                book.setImagePath(rs.getString("image_path"));
                book.setLocation(rs.getString("location"));
                book.setAvailable(rs.getBoolean("is_available"));
                book.setLenderId(rs.getString("lender_id"));
                return book;
            }
        });

        // Count the filtered books
        int totalCount = jdbcTemplate.queryForObject(countSql.toString(), countArgs.toArray(), Integer.class);

        // Return the page of books
        return new PageImpl<>(books, pageable, totalCount);
    }

    @Override
    public Book saveBook(Book book) {
        Book res = bookRepository.save(book);
        return res;
    }

    @Override
    public Book updateBook(String id, Book bookDetails) {
        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));

        // Update fields
        existingBook.setTitle(bookDetails.getTitle());
        existingBook.setAuthor(bookDetails.getAuthor());
        existingBook.setPublisher(bookDetails.getPublisher());
        existingBook.setGenre(bookDetails.getGenre());
        existingBook.setLanguage(bookDetails.getLanguage());
        existingBook.setPublishYear(bookDetails.getPublishYear());
        existingBook.setDescription(bookDetails.getDescription());
        existingBook.setImagePath(bookDetails.getImagePath());
        existingBook.setLocation(bookDetails.getLocation());
        existingBook.setAvailable(bookDetails.isAvailable());
        existingBook.setLenderId(bookDetails.getLenderId());

        return bookRepository.save(existingBook);
    }

    @Override
    public void deleteBook(String id) {
        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
        bookRepository.delete(existingBook);
    }
}



