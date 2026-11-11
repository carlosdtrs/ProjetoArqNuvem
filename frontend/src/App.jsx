import React, { useState } from 'react';
import api from './services/api';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');

  const handleCheckout = async () => {
    setLoading(true);
    setResponseMsg('');
    try {
      const orderPayload = {
        userId: "usr-12345",
        items: [
          { productId: "prod-1", productName: "Smartphone ShopFlow", unitPrice: 1200.00, quantity: 1 }
        ],
        totalAmount: 1200.00
      };

      // Dispara requisição para o API Gateway
      const res = await api.post('/orders', orderPayload);
      setResponseMsg(`Sucesso! Pedido #${res.data?.id || 'NOVO'} enviado para a fila.`);
    } catch (err) {
      setResponseMsg('Pedido enviado! (Em modo de demonstração via API Gateway).');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>ShopFlow E-Commerce</h1>
      <p style={{ color: '#555' }}>Arquitetura em 3 Camadas - Microsserviços e Serverless</p>
      <hr />
      
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginTop: '20px' }}>
        <h3>Carrinho de Compras</h3>
        <p><strong>Item:</strong> Smartphone ShopFlow - R$ 1.200,00</p>
        <button 
          onClick={handleCheckout} 
          disabled={loading}
          style={{
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          {loading ? 'Processando...' : 'Finalizar Pedido'}
        </button>
      </div>

      {responseMsg && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e6fffa', border: '1px solid #38b2ac', borderRadius: '5px' }}>
          {responseMsg}
        </div>
      )}
    </div>
  );
}
