package com.suna.bookexchange.bookexchange.repository;

import com.suna.bookexchange.bookexchange.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, String>, JpaSpecificationExecutor<Book> {

    Page<Book> findByTitleOrAuthorOrGenre(String title, String author, String genre, Pageable pageable);

    Page<Book> findAll(Pageable pageable);

    Book findBookById(String id);

    List<Book> findBookByLenderId(String lenderId);

}
