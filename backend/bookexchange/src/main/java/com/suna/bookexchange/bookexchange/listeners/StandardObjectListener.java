// src/main/java/com/suna/bookexchange/bookexchange/model/base/StandardObjectListener.java
package com.suna.bookexchange.bookexchange.model.base;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.sql.Timestamp;

public class StandardObjectListener {

    @PrePersist
    public void prePersist(StandardObject standardObject) {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        standardObject.setCreatedOn(now);
        standardObject.setUpdatedOn(now);
    }

    @PreUpdate
    public void preUpdate(StandardObject standardObject) {
        standardObject.setUpdatedOn(new Timestamp(System.currentTimeMillis()));
    }
}