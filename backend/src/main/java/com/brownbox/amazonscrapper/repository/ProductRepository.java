package com.brownbox.amazonscrapper.repository;

import java.util.Collection;
import java.util.List;

import com.brownbox.amazonscrapper.model.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
   Collection<Product> findByBrandContainingIgnoreCase(String brand);
   Collection<Product> findByCpuContainingIgnoreCase(String cpu);
   Collection<Product> findByScreenContainingIgnoreCase(String screen);
   Collection<Product> findByRamContainingIgnoreCase(String ram);
   Collection<Product> findByModelContainingIgnoreCase(String model);
   Collection<Product> findByCategoryContainingIgnoreCase(String category);
}
