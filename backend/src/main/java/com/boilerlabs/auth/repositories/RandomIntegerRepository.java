package com.boilerlabs.auth.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boilerlabs.auth.entities.RandomInteger;

public interface RandomIntegerRepository extends JpaRepository<RandomInteger, Long> {
    boolean existsByValue(Integer value);
}
