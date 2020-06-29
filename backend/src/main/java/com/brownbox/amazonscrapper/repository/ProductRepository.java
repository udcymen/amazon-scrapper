package com.brownbox.amazonscrapper.repository;

import java.util.Collection;
import java.util.List;

import com.brownbox.amazonscrapper.model.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
   Collection<Product> findByBrandIgnoreCase(String brand);
   Collection<Product> findByCpuIgnoreCase(String cpu);
   Collection<Product> findByScreenIgnoreCase(String screen);
   Collection<Product> findByRamIgnoreCase(String ram);
   Collection<Product> findByModelIgnoreCase(String model);
   Collection<Product> findByCategoryIgnoreCase(String category);
}
