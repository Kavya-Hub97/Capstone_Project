package com.upgrad.bookmyconsultation.repository;

import com.upgrad.bookmyconsultation.entity.Rating;

import java.util.ArrayList;
import java.util.List;

public abstract class RatingsRepositoryImpl implements RatingsRepository {
    @Override
    public List<Rating> findByDoctorId(String doctorId) {
        List<Rating> ratingsList= (List<Rating>) findAll();
        List<Rating> filteredRatingList =new ArrayList<>();
        for(Rating rating:ratingsList){
            if(rating.getDoctorId().equals(doctorId)){
                filteredRatingList.add(rating);
            }
        }
        return filteredRatingList;
    }
}
