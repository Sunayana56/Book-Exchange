package com.suna.bookexchange.bookexchange.service;

import com.suna.bookexchange.bookexchange.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BookService {

    public Page<Book> getBooksForSearch(String query, Pageable pageable);

    public Page<Book> getAllBooks(Pageable pageable);

    public Book getBookById(String id);

    public Page<Book> getFilteredBooks(String query, Boolean available, String genre, String location, Pageable pageable);

    public Book saveBook(Book book);

    public Book updateBook(String id, Book book);

    public void deleteBook(String id);
}
