/*
 * Copyright 2018-2019, https://beingtechie.io.
 *
 * File: UserAuthTokenStatus.java
 * Date: May 5, 2018
 * Author: Thribhuvan Krishnamurthy
 */
package com.upgrad.bookmyconsultation.enums;

/**
 * This UserAuthTokenStatus Enum is used to show the current status of the user
 */
public enum UserAuthTokenStatus {

    NOT_FOUND, ACTIVE, EXPIRED, LOGGED_OUT, CONCURRENT_LOGIN;

}