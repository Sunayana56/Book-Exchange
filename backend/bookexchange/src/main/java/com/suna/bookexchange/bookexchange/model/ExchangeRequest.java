package com.suna.bookexchange.bookexchange.model;

import com.suna.bookexchange.bookexchange.model.base.StandardObject;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
//@Table(name = "exchange_request")
public class ExchangeRequest extends StandardObject {

    private String requesterId;
    private String offeredBookId;
    private String lenderId;
    private String requestedBookId;
    private int daysRequested;
    private String status;

    public String getRequesterId() {
        return requesterId;
    }

    public void setRequesterId(String requesterId) {
        this.requesterId = requesterId;
    }

    public String getOfferedBookId() {
        return offeredBookId;
    }

    public void setOfferedBookId(String offeredBookId) {
        this.offeredBookId = offeredBookId;
    }

    public String getLenderId() {
        return lenderId;
    }

    public void setLenderId(String lenderId) {
        this.lenderId = lenderId;
    }

    public String getRequestedBookId() {
        return requestedBookId;
    }

    public void setRequestedBookId(String requestedBookId) {
        this.requestedBookId = requestedBookId;
    }

    public int getDaysRequested() {
        return daysRequested;
    }

    public void setDaysRequested(int daysRequested) {
        this.daysRequested = daysRequested;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
