import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <div class="home-header">
        <h1>🛍️ Loja Linda</h1>
        <p>Sua loja de produtos de beleza online</p>
      </div>

      <div class="home-content">
        <div class="welcome-section">
          <h2>Bem-vindo à nossa loja!</h2>
          <p>
            Descubra os melhores produtos de beleza com entrega rápida e preços incríveis.
            Navegue pelo nosso catálogo e encontre tudo o que você precisa.
          </p>
        </div>

        <div class="features-section">
          <div class="feature-card">
            <div class="feature-icon">📦</div>
            <h3>Entrega Rápida</h3>
            <p>Frete calculado por região com entrega em até 48h</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">💳</div>
            <h3>Pagamento Seguro</h3>
            <p>Múltiplas opções de pagamento com segurança total</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🎁</div>
            <h3>Produtos de Qualidade</h3>
            <p>Seleção cuidadosa dos melhores produtos de beleza</p>
          </div>
        </div>

        <div class="action-section">
          <a routerLink="/catalogo" class="btn-primary">
            🛍️ Explorar Catálogo
          </a>
          <a routerLink="/login" class="btn-secondary">
            🔐 Fazer Login
          </a>
        </div>

        <div class="info-section">
          <h3>💡 Como funciona:</h3>
          <ol>
            <li>Faça login na sua conta</li>
            <li>Navegue pelo catálogo e adicione produtos ao carrinho</li>
            <li>Finalize sua compra com frete calculado por região</li>
            <li>Receba seu pedido em casa!</li>
          </ol>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Arial', sans-serif;
    }

    .home-header {
      text-align: center;
      margin-bottom: 40px;
      padding: 40px 20px;
      background: linear-gradient(135deg, #007bff, #0056b3);
      color: white;
      border-radius: 10px;

      h1 {
        margin: 0 0 10px 0;
        font-size: 3rem;
        font-weight: bold;
      }

      p {
        margin: 0;
        font-size: 1.2rem;
        opacity: 0.9;
      }
    }

    .home-content {
      display: grid;
      gap: 40px;
    }

    .welcome-section {
      text-align: center;
      padding: 30px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

      h2 {
        color: #333;
        margin-bottom: 15px;
      }

      p {
        color: #666;
        line-height: 1.6;
      }
    }

    .features-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .feature-card {
      background: white;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .feature-icon {
        font-size: 3rem;
        margin-bottom: 15px;
      }

      h3 {
        color: #333;
        margin-bottom: 10px;
      }

      p {
        color: #666;
        line-height: 1.5;
      }
    }

    .action-section {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .btn-primary, .btn-secondary {
      padding: 15px 30px;
      border-radius: 5px;
      font-size: 1.1rem;
      font-weight: bold;
      text-decoration: none;
      display: inline-block;
      transition: all 0.3s ease;
      min-width: 200px;
      text-align: center;
    }

    .btn-primary {
      background: #28a745;
      color: white;

      &:hover {
        background: #218838;
        transform: translateY(-2px);
      }
    }

    .btn-secondary {
      background: #6c757d;
      color: white;

      &:hover {
        background: #5a6268;
        transform: translateY(-2px);
      }
    }

    .info-section {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 10px;
      border-left: 4px solid #007bff;

      h3 {
        color: #333;
        margin-bottom: 15px;
      }

      ol {
        color: #666;
        line-height: 1.8;

        li {
          margin-bottom: 8px;
        }
      }
    }

    @media (max-width: 768px) {
      .home-header {
        padding: 30px 15px;

        h1 {
          font-size: 2.5rem;
        }

        p {
          font-size: 1rem;
        }
      }

      .features-section {
        grid-template-columns: 1fr;
      }

      .action-section {
        flex-direction: column;
        align-items: center;

        .btn-primary, .btn-secondary {
          width: 100%;
          max-width: 300px;
        }
      }
    }
  `]
})
export class HomeComponent {}
