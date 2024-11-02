package com.boilerlabs.auth.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boilerlabs.auth.entities.RandomInteger;
import com.boilerlabs.auth.services.RandomIntegerService;

@RestController
@RequestMapping("/api/numbers")
public class RandomIntegerController {

    @Autowired
    private RandomIntegerService randomIntegerService;

    @GetMapping
    public ResponseEntity<List<RandomInteger>> getNumbers() {
        return ResponseEntity.ok(randomIntegerService.getRandomIntegers());
    }
}