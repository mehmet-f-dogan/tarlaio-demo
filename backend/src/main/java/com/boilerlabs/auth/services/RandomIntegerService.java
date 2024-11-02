package com.boilerlabs.auth.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.boilerlabs.auth.entities.RandomInteger;
import com.boilerlabs.auth.repositories.RandomIntegerRepository;

@Service
public class RandomIntegerService {

    @Autowired
    private RandomIntegerRepository randomIntegerRepository;

    @Cacheable(value = "randomIntegersCache")
    public List<RandomInteger> getRandomIntegers() {
        return randomIntegerRepository.findAll();
    }
}
