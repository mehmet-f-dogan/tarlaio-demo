package com.boilerlabs.auth.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.boilerlabs.auth.entities.Role;
import com.boilerlabs.auth.records.SignUpRequestRecord;
import com.boilerlabs.auth.entities.RandomInteger;
import com.boilerlabs.auth.repositories.RoleRepository;
import com.boilerlabs.auth.services.AuthService;
import com.boilerlabs.auth.repositories.RandomIntegerRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Configuration
public class DataInitializer {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RandomIntegerRepository randomIntegerRepository; // Autowire the repository for RandomInteger

    @Autowired
    private AuthService authService;

    @Bean
    public CommandLineRunner initializeRolesAndRandomIntegers() {

        return args -> {
            // Initialize roles
            if (!roleRepository.existsByName("ROLE_USER")) {
                roleRepository.save(new Role("ROLE_USER"));
            }

            if (!roleRepository.existsByName("ROLE_ADMIN")) {
                roleRepository.save(new Role("ROLE_ADMIN"));
            }

            
            authService.signUp(new SignUpRequestRecord("admin", "admin"));
            
            System.out.println("Saved user with credentials admin:admin");

            // Prepare to batch insert 20,000 random integers
            List<RandomInteger> randomIntegers = new ArrayList<>();
            Random random = new Random();

            for (int i = 0; i < 20000; i++) {
                RandomInteger randomInteger = new RandomInteger();
                randomInteger.setValue(random.nextInt(100000)); // Adjust range as needed
                randomIntegers.add(randomInteger);
            }

            // Perform the batch insert
            randomIntegerRepository.saveAll(randomIntegers);

            System.out.println("Inserted 20,000 random integers into the database.");


        };
    }
}
