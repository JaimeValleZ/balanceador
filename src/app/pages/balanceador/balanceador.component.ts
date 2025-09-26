
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Producto {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-balanceador',
  templateUrl: './balanceador.html',
  styleUrls: ['./balanceador.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class BalanceadorComponent implements OnInit {
  productos: Producto[] = [];
  nuevoProducto: Producto = { id: 0, name: '', price: 0 };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Producto[]>('http://localhost:8080/api/products/generate')
      .subscribe(data => this.productos = data);
  }

  agregarProducto() {
    this.http.post('http://localhost:8080/api/products', this.nuevoProducto)
      .subscribe(() => {
        alert('Producto agregado!');
        this.nuevoProducto = { id: 0, name: '', price: 0 };
        this.ngOnInit();
      });
  }
}
