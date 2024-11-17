package com.suna.bookexchange.bookexchange.model.dto;

public class BookCreateDTO {

    private String title;
    private String author;
    private String publisher;
    private String genre;
    private String language;
    private int publishYear;
    private String description;
    private String imagePath;
    private String location;
    private boolean isAvailable;
    private String lenderId;

    public BookCreateDTO() {
    }

    public BookCreateDTO(String title, String author, String publisher, String genre, String language, int publishYear, String description, String imagePath, String location, boolean isAvailable, String lenderId) {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.genre = genre;
        this.language = language;
        this.publishYear = publishYear;
        this.description = description;
        this.imagePath = imagePath;
        this.location = location;
        this.isAvailable = isAvailable;
        this.lenderId = lenderId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public int getPublishYear() {
        return publishYear;
    }

    public void setPublishYear(int publishYear) {
        this.publishYear = publishYear;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public String getLenderId() {
        return lenderId;
    }

    public void setLenderId(String lenderId) {
        this.lenderId = lenderId;
    }
}
