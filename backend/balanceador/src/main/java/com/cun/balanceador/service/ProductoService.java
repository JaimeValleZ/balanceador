package com.cun.balanceador.service;

import com.cun.balanceador.modelo.Producto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class ProductoService {

    public List<Producto> generateProducts(int count) {
        List<Producto> products = new ArrayList<>();
        Random random = new Random();

        for (int i = 1; i <= count; i++) {
            double price = 10 + (5000 - 10) * random.nextDouble(); // precios entre 10 y 5000
            products.add(new Producto(i, "Tralalelo Tralala " + i, Math.round(price * 100.0) / 100.0));
        }

        return products;
    }
}