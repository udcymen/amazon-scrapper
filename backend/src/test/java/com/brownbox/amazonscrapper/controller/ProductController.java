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

@RestController
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/products")
    public Page<Product> getQuestions(Pageable pageable){
        return productRepository.findAll(pageable);
    }

    @PostMapping("/products")
    public Product createQuestion(@Valid @RequestBody Product question){
        return productRepository.save(question);
    }

    @PutMapping("/products/{productId}")
    public Product updateQuestion(@PathVariable long questionId,
                                   @Valid @RequestBody Product productRequest){
        return productRepository.findById(questionId)
                .map(product -> {
                    product.setPrice(productRequest.getPrice());
                    product.setASIN(productRequest.getASIN());
                    product.setRank(productRequest.getRank());
                    product.setLink(productRequest.getLink());
                    product.setCreatedAt(productRequest.getCreatedAt());
                    product.setCatergory(productRequest.getCatergory());
                    product.setBrand(productRequest.getBrand());
                    product.setCpu(productRequest.getCpu());
                    product.setScreen(productRequest.getScreen());
                    product.setRam(productRequest.getRam());
                    product.setSsd(productRequest.getSsd());
                    product.setHhd(productRequest.getHhd());
                    product.setType(productRequest.getType());
                    product.setModel(productRequest.getModel());
                    product.setOs(productRequest.getOs());
                    product.setDvd(productRequest.isDvd());
                    product.setKeyboard(productRequest.getKeyboard());
                    product.setSecurity(productRequest.getSecurity());
                    product.setVc(productRequest.getVc());
                    product.setUpc(productRequest.getUpc());
                    product.setSku(productRequest.getSku());
                    product.setOffice(productRequest.getOffice());
                    product.setNote(productRequest.getNote());
                    return productRepository.save(product);
                }).orElseThrow(() -> new ResourceNotFoundException("Question not found with id " + questionId));
    }

    @DeleteMapping("products/{productId}")
    public ResponseEntity<?> deleteQuestion(@PathVariable long productId){
        return productRepository.findById(productId)
                .map(question -> {
                    productRepository.delete(question);
                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new ResourceNotFoundException("Question not found with id " + productId));
    }
}
