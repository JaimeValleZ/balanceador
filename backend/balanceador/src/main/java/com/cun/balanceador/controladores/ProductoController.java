package com.cun.balanceador.controladores;

import com.cun.balanceador.modelo.Producto;
import com.cun.balanceador.service.ProductoService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    // Genera 50,000 productos
    @GetMapping("/api/products/generate")
    public List<Producto> generateProducts() {
        return productoService.generateProducts(50000);
    }
}
