/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartItem, Product } from '../types';
import { playSound } from '../utils/sound';
import { 
  X, 
  Trash2, 
  CreditCard, 
  Lock, 
  Activity, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight,
  Info
} from 'lucide-react';

interface CartSectionProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  paymentMethods: string[];
  onClose: () => void;
  setActiveTab?: (tab: string) => void;
}

export default function CartSection({
  cart,
  setCart,
  paymentMethods,
  onClose,
  setActiveTab,
}: CartSectionProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>(paymentMethods[0] || 'PSE');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Payment Form details
  const [phone, setPhone] = useState('');
  const [ccNumber, setCcNumber] = useState('');
  const [ccHolder, setCcHolder] = useState('');
  const [email, setEmail] = useState('');
  const [pseBank, setPseBank] = useState('Bancolombia');

  // Domicilio / Envío details
  const [recipientName, setRecipientName] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingDept, setShippingDept] = useState('Bogotá D.C.');

  // Receipt printed info state
  const [receiptDetails, setReceiptDetails] = useState<any>(null);

  const subtotal = cart.reduce((acc, curr) => acc + (curr.product.price + (curr.size - 38) * 10000) * curr.quantity, 0);
  const shipping = subtotal > 1500000 ? 0 : 25000;
  const total = subtotal + shipping;

  const formatCOP = (num: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(num);
  };

  const handleRemoveItem = (index: number) => {
    playSound('danger');
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateQty = (index: number, newQty: number) => {
    if (newQty < 1) return;
    playSound('hover');
    setCart(prev => prev.map((item, i) => i === index ? { ...item, quantity: newQty } : item));
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    playSound('hologram');
    setIsProcessing(true);

    // Simulate futuristic validation scanning
    setTimeout(() => {
      playSound('success');
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Store checkout receipt variables
      setReceiptDetails({
        orderId: `SS-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleString(),
        paymentMethod: selectedMethod,
        items: [...cart],
        subtotal,
        shipping,
        total,
        clientEmail: email || 'usuario_anonimo@streetsupply.net',
        recipientName: recipientName || 'MATEO SILVA',
        shippingPhone: shippingPhone || '3124455667',
        shippingAddress: shippingAddress || 'Avenida El Dorado #68c-61',
        shippingCity: shippingCity || 'Bogotá',
        shippingDept: shippingDept || 'Bogotá D.C.',
        trackingCode: `ST-SERV-${Math.floor(1000000 + Math.random() * 8999999)}`,
        carrier: ['Servientrega Cyber-Express', 'Interrapidísimo Quantum', 'Coordinadora Holográfica'][Math.floor(Math.random() * 3)],
        estimatedDays: subtotal > 1500000 ? '1 - 2 días hábiles (Envío Prioritario)' : '3 - 4 días hábiles',
      });

      // Clear actual shopping cart
      setCart([]);
    }, 2800);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-[#050505]/98 border-l border-white/10 z-50 flex flex-col shadow-[0_0_35px_rgba(249,115,22,0.15)] scanline" id="shopping-cart-drawer">
      {/* HUD scanning line decoration */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-orange-500"></div>

      {/* Cart Navigation Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/60 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Activity className="w-4.5 h-4.5 text-orange-500 animate-pulse" />
          <span className="text-white font-bold tracking-widest uppercase">ST_CART_MODULE // {cart.length} ITEMS</span>
        </div>
        <button
          onClick={() => { playSound('click'); onClose(); }}
          className="p-1 px-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded transition-colors uppercase font-mono text-[9px] flex items-center gap-1"
          id="close-cart-btn"
        >
          <X className="w-3.5 h-3.5" />
          CERRAR
        </button>
      </div>

      {/* Cart Content body scrolling */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isSuccess && receiptDetails ? (
          /* DIGITAL THERMAL RECEIPT & SHIPPING PROCESSOR OVERLAY */
          <div className="space-y-4 animate-fade-in" id="receipt-success-display">
            <div className="text-center space-y-2 py-3 bg-[#0a0a0a] border border-green-500/10 rounded-xl">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider glow-green">
                PAGO AUTORIZADO // DESPACHO CONFIRMADO
              </h3>
              <p className="text-[10px] text-gray-400 font-mono">
                La orden ha sido sincronizada de forma segura.
              </p>
            </div>

            {/* SECCIÓN DE DATOS DE ENVÍO Y RUTA DE DESPACHO */}
            <div className="bg-[#0c0c0c] border border-orange-500/35 rounded-xl p-4 space-y-4 font-mono text-[11px] text-gray-400" id="shipping-carrier-roadmap">
              <div className="border-b border-white/10 pb-2 flex items-center justify-between text-white">
                <span className="text-[10px] font-bold tracking-widest text-orange-500">
                  HOJA DE RUTA // LOGÍSTICA COLOMBIA
                </span>
                <span className="text-[9px] px-1.5 py-0.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded uppercase animate-pulse">
                  Pre-Despacho
                </span>
              </div>

              {/* Step-by-step dispatch tracking progress */}
              <div className="space-y-3 py-1">
                <div className="relative flex justify-between items-center">
                  <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/5 -translate-y-1/2 -z-10"></div>
                  <div className="absolute top-1/2 left-0 w-1/4 h-[2px] bg-orange-500 -translate-y-1/2 -z-10 animate-pulse"></div>

                  <div className="flex flex-col items-center">
                    <span className="w-5 h-5 rounded-full bg-orange-500 text-black text-[9px] font-bold flex items-center justify-center border-2 border-orange-400 shadow-[0_0_8px_#f97316]">1</span>
                    <span className="text-[7.5px] mt-1 text-orange-400 font-bold uppercase">Procesado</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-gray-600 text-[9px] font-bold flex items-center justify-center border border-white/10">2</span>
                    <span className="text-[7.5px] mt-1 text-gray-500 uppercase">Empacado</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-gray-600 text-[9px] font-bold flex items-center justify-center border border-white/10">3</span>
                    <span className="text-[7.5px] mt-1 text-gray-500 uppercase">En camino</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-gray-600 text-[9px] font-bold flex items-center justify-center border border-white/10">4</span>
                    <span className="text-[7.5px] mt-1 text-gray-500 uppercase">Entregado</span>
                  </div>
                </div>
                
                <div className="p-2.5 bg-orange-500/5 border border-orange-500/15 rounded text-[9px] text-orange-400/90 text-center animate-pulse tracking-wide">
                  &gt;&gt; EL PEDIDO SE ENCUENTRA EN EMBALAJE Y DETECCIÓN EN SEDE PRINCIPAL
                </div>
              </div>

              {/* Shipping Details */}
              <div className="space-y-1.5 text-[11px] border-t border-white/10 pt-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">NÚMERO DE GUÍA:</span>
                  <span className="text-orange-400 font-bold uppercase tracking-wider">{receiptDetails.trackingCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-550">TRANSPORTADORA:</span>
                  <span className="text-white font-semibold">{receiptDetails.carrier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-550">ENTREGA ESTIMADA:</span>
                  <span className="text-white font-medium">{receiptDetails.estimatedDays}</span>
                </div>
                
                <div className="border-t border-dashed border-white/10 my-2"></div>
                
                <div className="space-y-1 text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-gray-550">NOMBRES:</span>
                    <span className="text-white uppercase font-bold">{receiptDetails.recipientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-550">DOMICILIO:</span>
                    <span className="text-white text-right max-w-[200px] truncate">{receiptDetails.shippingAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-550">LUGAR:</span>
                    <span className="text-white uppercase">{receiptDetails.shippingCity}, {receiptDetails.shippingDept}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-550">TEL_CONTACTO:</span>
                    <span className="text-white font-semibold">{receiptDetails.shippingPhone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cyber Thermal Ticket Receipt Graphic */}
            <div className="bg-white text-black p-5 font-mono text-xs shadow-inner rounded space-y-3 relative overflow-hidden" id="thermal-receipt-ticket">
              {/* Receipt top decorative teeth */}
              <div className="flex justify-between text-[8px] tracking-[0.2em] font-bold border-b border-dashed border-gray-400 pb-2">
                <span>STREETSUPPLY // COP_GATE</span>
                <span>ORIGINAL_VERIFIED</span>
              </div>

              {/* Order Info */}
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between">
                  <span>ORDEN ID:</span>
                  <span className="font-bold">{receiptDetails.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span>FECHA:</span>
                  <span>{receiptDetails.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>MÉTODO:</span>
                  <span>{receiptDetails.paymentMethod.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>EMAIL:</span>
                  <span className="truncate max-w-[180px]">{receiptDetails.clientEmail}</span>
                </div>
              </div>

              <div className="border-t border-b border-dashed border-gray-400 py-3 space-y-2 text-[10px]">
                {receiptDetails.items.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between align-top">
                    <span>
                      {item.product.name} (Talla: {item.size}) x{item.quantity}
                    </span>
                    <span className="font-semibold text-right">
                      {formatCOP((item.product.price + (item.size - 38) * 10000) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total calculations */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-[11px]">
                  <span>SUBTOTAL:</span>
                  <span>{formatCOP(receiptDetails.subtotal)}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>ENVÍO:</span>
                  <span>{receiptDetails.shipping === 0 ? 'GRATIS' : formatCOP(receiptDetails.shipping)}</span>
                </div>
                <div className="flex justify-between text-[13px] font-bold border-t border-dashed border-gray-400 pt-2 text-black">
                  <span>TOTAL PAGADO:</span>
                  <span>{formatCOP(receiptDetails.total)}</span>
                </div>
              </div>

              {/* Barcode Mock Component */}
              <div className="pt-4 flex flex-col items-center gap-1.5 border-t border-dashed border-gray-300">
                <div className="h-8 w-44 bg-black flex flex-row items-stretch gap-[1.5px] p-0.5 justify-center">
                  {/* Pseudo Barcode lines */}
                  {[3, 1, 2, 4, 1, 3, 2, 4, 3, 1, 2, 3, 4, 2, 1, 3, 2, 4, 1, 2].map((w, index) => (
                    <span key={index} className="bg-white flex-1" style={{ maxWidth: `${w}px` }}></span>
                  ))}
                </div>
                <span className="text-[8px] font-mono select-none">{receiptDetails.orderId}</span>
              </div>

              <div className="text-center text-[8px] text-gray-500 uppercase tracking-widest pt-2">
                Gracias por comprar en STREETSUPPLY Colombia. <br />
                Tu pedido está siendo preparado para ser entregado.
              </div>
            </div>

            <button
              onClick={() => { playSound('click'); setIsSuccess(false); setReceiptDetails(null); onClose(); }}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg font-mono text-xs uppercase tracking-widest transition-colors cursor-pointer"
              id="complete-checkout-finalize"
            >
              FINALIZAR DIAGNÓSTICO
            </button>
          </div>
        ) : cart.length === 0 ? (
          /* EMPTY CART VIEW */
          <div className="py-20 text-center space-y-4" id="empty-cart-view">
            <div className="w-16 h-16 bg-slate-900/60 border border-slate-800 rounded-full flex items-center justify-center mx-auto text-gray-600">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                CARRITO VACÍO
              </h4>
              <p className="text-xs text-gray-500">
                Visita la pestaña de productos y selecciona una zapatilla para verla en 3D.
              </p>
            </div>
            <button
              onClick={() => { playSound('click'); onClose(); if (setActiveTab) setActiveTab('/productos'); }}
              className="px-5 py-2.5 bg-slate-950 hover:bg-slate-900 border border-orange-500/20 text-orange-500 font-mono text-xs rounded-lg transition-colors uppercase cursor-pointer"
              id="empty-cart-back-btn"
            >
              Buscar Productos
            </button>
          </div>
        ) : (
          /* ITEMS LIST & PAYMENT GATEWAY FORM */
          <div className="space-y-6" id="cart-items-form-container">
            {/* List of Cart Items */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-orange-500 uppercase tracking-widest border-b border-white/10 pb-1.5 mb-2">
                ZAPATILLAS REQUERIDAS
              </h4>
              {cart.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#0a0a14] border border-slate-850 rounded-lg flex gap-3 justify-between items-center group relative overflow-hidden"
                  id={`cart-item-${item.product.id}-${idx}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 bg-orange-950/40 text-orange-500 border border-orange-500/20 rounded">
                        {item.product.brand}
                      </span>
                      <span className="text-[10px] font-mono text-orange-500">
                        Talla: {item.size}
                      </span>
                    </div>
                    <h5 className="text-xs font-mono font-bold text-white truncate mt-1">
                      {item.product.name}
                    </h5>
                    <div className="text-xs font-mono font-semibold text-orange-300 mt-1">
                      {formatCOP(item.product.price + (item.size - 38) * 10000)} COP
                    </div>
                  </div>

                  {/* Quantity and removal buttons */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded p-1">
                      <button
                        onClick={() => handleUpdateQty(idx, item.quantity - 1)}
                        className="w-5 h-5 bg-slate-900 text-slate-300 text-[10px] rounded hover:bg-slate-800 flex items-center justify-center font-bold"
                        id={`dec-qty-${idx}`}
                      >
                        -
                      </button>
                      <span className="text-xs font-mono font-bold text-white px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQty(idx, item.quantity + 1)}
                        className="w-5 h-5 bg-slate-900 text-slate-300 text-[10px] rounded hover:bg-slate-800 flex items-center justify-center font-bold"
                        id={`inc-qty-${idx}`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(idx)}
                      className="p-1.5 bg-slate-950 border border-slate-800 text-red-400 hover:text-white hover:bg-red-950/20 rounded transition-colors"
                      id={`remove-item-${idx}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cyberpunk Payment Processor Selector */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-orange-500 uppercase tracking-widest border-b border-white/10 pb-1.5 mb-2">
                PROCESADOR COLOMBIA GATEWAY
              </h4>
              <div className="grid grid-cols-2 gap-2" id="payment-selector-grid">
                {paymentMethods.map((method) => {
                  const isSel = selectedMethod === method;
                  return (
                    <button
                      key={method}
                      type="button"
                      onClick={() => { playSound('click'); setSelectedMethod(method); }}
                      className={`py-2 px-3 border rounded-lg text-[10px] font-mono font-bold tracking-wider transition-all duration-300 ${
                        isSel
                          ? 'bg-orange-500/20 border-orange-500 text-orange-300 shadow-[0_0_8px_rgba(249,115,22,0.3)]'
                          : 'bg-black/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                      id={`pay-method-${method.toLowerCase().replace(' ', '-')}`}
                    >
                      {method.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Checkout Form fields dependent on selection */}
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              {/* DATOS DE DOMICILIO Y DESPACHO (KINETIC LOGISTICS HUB) */}
              <div className="space-y-3 p-4 bg-[#080808]/90 border border-white/10 rounded-lg">
                <div className="flex items-center gap-1.5 text-[9px] text-orange-500 font-mono tracking-wider mb-2 uppercase">
                  <Activity className="w-3 h-3 text-orange-500 animate-pulse" />
                  <span>DATOS_DE_DOMICILIO // REGISTRO_ENVIO_COLOMBIA</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[8px] font-mono text-gray-500 uppercase">
                      Nombre Del Destinatario
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carlos Mendoza"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded p-2 text-xs font-mono text-white outline-none"
                      id="recipient-name-field"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[8px] font-mono text-gray-500 uppercase">
                      Celular de Contacto
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. 3124567890"
                      value={shippingPhone}
                      onChange={(e) => setShippingPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded p-2 text-xs font-mono text-white outline-none"
                      id="shipping-phone-field"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[8px] font-mono text-gray-500 uppercase">
                      Departamento
                    </label>
                    <select
                      value={shippingDept}
                      onChange={(e) => setShippingDept(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded p-2 text-xs font-mono text-white outline-none"
                      id="shipping-dept-select"
                    >
                      <option value="Bogotá D.C.">Bogotá D.C.</option>
                      <option value="Antioquia">Antioquia</option>
                      <option value="Cundinamarca">Cundinamarca</option>
                      <option value="Valle del Cauca">Valle del Cauca</option>
                      <option value="Atlántico">Atlántico</option>
                      <option value="Santander">Santander</option>
                      <option value="Bolívar">Bolívar</option>
                      <option value="Risaralda">Risaralda</option>
                      <option value="Caldas">Caldas</option>
                      <option value="Quindío">Quindío</option>
                      <option value="Nariño">Nariño</option>
                      <option value="Huila">Huila</option>
                      <option value="Tolima">Tolima</option>
                      <option value="Magdalena">Magdalena</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[8px] font-mono text-gray-500 uppercase">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Medellín"
                      value={shippingCity}
                      onChange={(e) => setShippingCity(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded p-2 text-xs font-mono text-white outline-none"
                      id="shipping-city-field"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[8px] font-mono text-gray-500 uppercase">
                    Dirección de Entrega Completa
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Calle 100 #15-30 Torre 2 Apt 503 / Barrio"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded p-2 text-xs font-mono text-white outline-none"
                    id="shipping-address-field"
                  />
                </div>
              </div>

              <div className="space-y-3 p-4 bg-[#080808]/90 border border-white/10 rounded-lg">
                <div className="flex items-center gap-1.5 text-[9px] text-orange-500 font-mono tracking-wider mb-2 uppercase">
                  <Lock className="w-3 h-3 text-orange-500" />
                  <span>MOD_SECURITY_TRANSACTION // SSL_SECURE</span>
                </div>

                <div className="space-y-1">
                  <label className="block text-[8px] font-mono text-gray-500 uppercase">
                    E-mail Para Recibo Digital
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="usuario@tuemail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded p-2 text-xs font-mono text-white outline-none"
                    id="email-input-field"
                  />
                </div>

                {selectedMethod.toLowerCase() === 'nequi' || selectedMethod.toLowerCase() === 'daviplata' ? (
                  /* NEQUI / DAVIPLATA MOBILE PAYMENT FORM */
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-[8px] font-mono text-gray-500 uppercase">
                      Número Telefónico Autorizado
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        pattern="^3[0-9]{9}$"
                        placeholder="Ej: 3143587441"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded p-2 text-xs font-mono text-white outline-none pl-9"
                        id="phone-input-field"
                      />
                      <Smartphone className="w-4 h-4 text-orange-500 absolute left-3 top-2.5" />
                    </div>
                    <span className="text-[8px] text-gray-500 font-mono">
                      *Recibirás un mensaje "push notification" en tu billetera {selectedMethod}.
                    </span>
                  </div>
                ) : selectedMethod.toLowerCase() === 'pse' ? (
                  /* PSE BANK SELECTOR */
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-[8px] font-mono text-gray-500 uppercase">
                      Seleccionar Institución Financiera
                    </label>
                    <select
                      value={pseBank}
                      onChange={(e) => setPseBank(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded p-2 text-xs font-mono text-white outline-none"
                      id="pse-bank-select"
                    >
                      <option value="Bancolombia">Bancolombia S.A.</option>
                      <option value="BBVA">Banco BBVA Colombia</option>
                      <option value="Banco de Bogota">Banco de Bogotá</option>
                      <option value="Davivienda">Banco Davivienda</option>
                      <option value="Banco de Occidente">Banco de Occidente</option>
                      <option value="MercadoPago">Billetera MercadoPago</option>
                    </select>
                    <span className="text-[8px] text-gray-550 font-mono">
                      *Redirección programada en paso final a pasarela unificada PSE.
                    </span>
                  </div>
                ) : (
                  /* CREDIT CARD PAYMENTS FORM */
                  <div className="space-y-2.5 animate-fade-in">
                    <div className="space-y-1">
                      <label className="block text-[8px] font-mono text-gray-500 uppercase">
                        Nombre completo del Titular
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: JUAN PEREZ ESPINOSA"
                        value={ccHolder}
                        onChange={(e) => setCcHolder(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded p-2 text-xs font-mono text-white outline-none"
                        id="cc-holder-input"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[8px] font-mono text-gray-500 uppercase">
                        Tarjeta de crédito internacional
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          pattern="^[0-9]{16}$"
                          placeholder="4111 2222 3333 4444"
                          value={ccNumber}
                          onChange={(e) => setCcNumber(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded p-2 text-xs font-mono text-white outline-none pl-9"
                          id="cc-number-input"
                        />
                        <CreditCard className="w-4 h-4 text-orange-550 absolute left-3 top-2.5" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* TICKET BILL CALCULATOR AND SUBMIT CARD BUTTON */}
              <div className="p-3 bg-black/60 border border-white/10 rounded-lg space-y-2 text-xs font-mono">
                <div className="flex justify-between text-gray-400">
                  <span>SUBTOTAL REQUERIDAS:</span>
                  <span className="text-white">{formatCOP(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>TARIFA DE ENVÍO:</span>
                  <span className="text-white">
                    {shipping === 0 ? 'COBERTURA GRATUITA' : `${formatCOP(shipping)}`}
                  </span>
                </div>
                
                {shipping > 0 && (
                  <div className="flex items-center gap-1.5 p-1 px-2 bg-orange-550/5 text-[9px] text-orange-500 border border-orange-500/10 rounded">
                    <Info className="w-3.5 h-3.5" />
                    <span>Envío GRATIS en compras mayores a $1.500.000 COP</span>
                  </div>
                )}

                <div className="flex justify-between text-sm font-bold border-t border-white/10 pt-2 text-white shadow-sm">
                  <span>TOTAL FACTURADO:</span>
                  <span className="text-orange-300">{formatCOP(total)} COP</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-3.5 px-4 rounded-lg font-mono font-bold text-xs tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  isProcessing
                    ? 'bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 text-slate-500'
                    : 'bg-gradient-to-r from-orange-550 to-orange-500 hover:brightness-110 text-black font-semibold border border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                }`}
                id="checkout-finalize-btn"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-slate-600 border-t-cyan-400 animate-spin mr-1"></span>
                    VERIFICANDO DEPÓSITO...
                  </>
                ) : (
                  <>
                    PAGAR CON {selectedMethod.toUpperCase()}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
