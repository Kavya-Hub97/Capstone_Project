package com.upgrad.bookmyconsultation.repository;
import com.upgrad.bookmyconsultation.entity.User;
import java.util.List;
import java.util.Optional;


public abstract class UserRepositoryImpl implements UserRepository {
    public List<User> findAll(){
        return findAll();
    }
    public User findByEmailId(String emailId){
        return findById(emailId).get();
    }

}

