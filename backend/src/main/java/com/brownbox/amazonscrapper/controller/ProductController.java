package com.brownbox.amazonscrapper.controller;

import com.brownbox.amazonscrapper.exception.ResourceNotFoundException;
import com.brownbox.amazonscrapper.model.Product;
import com.brownbox.amazonscrapper.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

   @GetMapping("/products")
   public Page<Product> searchProducts(Pageable pageable, String searchTerms){
       if (searchTerms == null) {
           return productRepository.findAll(pageable);
       }

       searchTerms = searchTerms.toLowerCase().trim();

       if (searchTerms.isEmpty()) {
            return productRepository.findAll(pageable);
       }

       List<Product> result = new ArrayList<>();
       boolean isFirstEmpty = true;

       for (String searchTerm : searchTerms.split(" ")){
           Set<Product> local = new HashSet<>();
           local.addAll(productRepository.findByBrandContainingIgnoreCase(searchTerm));
           local.addAll(productRepository.findByCpuContainingIgnoreCase(searchTerm));
           local.addAll(productRepository.findByScreenContainingIgnoreCase(searchTerm));
           local.addAll(productRepository.findByRamContainingIgnoreCase(searchTerm));
           local.addAll(productRepository.findByModelContainingIgnoreCase(searchTerm));
           local.addAll(productRepository.findByCategoryContainingIgnoreCase(searchTerm));

           if (result.size() == 0) {
               if (isFirstEmpty) {
                   result.addAll(local);
                   continue;
               } else {
                   break;
               }
           }
           result.retainAll(local);
       }

       if (result.size() == 0) {
           throw new ResourceNotFoundException("No Matching Keyword(" + searchTerms + ") Products Found!");
       }

       long startIndex = pageable.getOffset();
       long endIndex = Math.min((startIndex + pageable.getPageSize()), result.size());

       final Page<Product> page = new PageImpl<>(result.subList((int)startIndex, (int)endIndex), pageable, result.size());

       return page;
   }

    @PostMapping("/products")
    public Product createProduct(@Valid @RequestBody Product product){
        return productRepository.save(product);
    }

    @PutMapping("/products/{productId}")
    public Product updateProduct(@PathVariable long productId, @Valid @RequestBody Product productRequest){
        return productRepository.findById(productId).map(product -> {
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
        }).orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + productId));
    }

    @DeleteMapping("products/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable long productId){
        return productRepository.findById(productId).map(product -> {
            productRepository.delete(product);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + productId));
    }
}
