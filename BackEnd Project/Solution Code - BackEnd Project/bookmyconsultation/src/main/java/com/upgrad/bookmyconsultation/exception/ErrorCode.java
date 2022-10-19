/*
 * Copyright 2018-2019, https://beingtechie.io.
 *
 * File: ErrorCode.java
 * Date: May 5, 2018
 * Author: Thribhuvan Krishnamurthy
 */
package com.upgrad.bookmyconsultation.exception;

/**
 * This ErrorCode interface gets errorcode and defaultmessage
 */
public interface ErrorCode {

    String getCode();

    String getDefaultMessage();

}
