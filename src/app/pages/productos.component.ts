
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Producto {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Producto[]>('http://localhost:8080/api/products/generate')
      .subscribe(data => this.productos = data);
  }
}
