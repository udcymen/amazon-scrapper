package com.brownbox.amazonscrapper.controller;

import com.brownbox.amazonscrapper.exception.ResourceNotFoundException;
import com.brownbox.amazonscrapper.model.Product;
import com.brownbox.amazonscrapper.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/products")
    public Page<Product> getProducts(Pageable pageable){
        return productRepository.findAll(pageable);
    }

    @PostMapping("/products")
    public Product createProduct(@Valid @RequestBody Product question){
        return productRepository.save(question);
    }

    @PutMapping("/products/{productId}")
    public Product updateProduct(@PathVariable long questionId,
                                   @Valid @RequestBody Product productRequest){
        return productRepository.findById(questionId)
                .map(product -> {
                    product.setPrice(productRequest.getPrice());
                    product.setASIN(productRequest.getASIN());
                    product.setRank(productRequest.getRank());
                    product.setLink(productRequest.getLink());
                    product.setCreatedAt(productRequest.getCreatedAt());
                    product.setCategory(productRequest.getCategory());
                    product.setBrand(productRequest.getBrand());
                    product.setCpu(productRequest.getCpu());
                    product.setScreen(productRequest.getScreen());
                    product.setRam(productRequest.getRam());
                    product.setSsd(productRequest.getSsd());
                    product.setHhd(productRequest.getHhd());
                    product.setType(productRequest.getType());
                    product.setModel(productRequest.getModel());
                    product.setOs(productRequest.getOs());
                    product.setDvd(productRequest.getDvd());
                    product.setBacklit(productRequest.getBacklit());
                    product.setSecurity(productRequest.getSecurity());
                    product.setVc(productRequest.getVc());
                    product.setUpc(productRequest.getUpc());
                    product.setSku(productRequest.getSku());
                    product.setOffice(productRequest.getOffice());
                    product.setNote(productRequest.getNote());
                    return productRepository.save(product);
                }).orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + questionId));
    }

    @DeleteMapping("products/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable long productId){
        return productRepository.findById(productId)
                .map(product -> {
                    productRepository.delete(product);
                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + productId));
    }
}
