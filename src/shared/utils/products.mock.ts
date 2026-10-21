// products.mock.ts
// Mock de productos de ferretería (3-6 productos por categoría, 5 categorías)

import type { DBProduct } from "../../product/types/product.types";
import formatKeyFeatures from "../../product/utils/formatKeyFeatures";

export interface ProductMock {
  id: string;
  name: string;
  category: string;
  stock: number;
  purchasePrice: number;
  salePrice: number;
  offerPrice: number;
  brand: string;
  color: string;
  keyFeatures: string[];
  description: string;
}

const categoryIds = {
  'Fijaciones y Tornillería': '054abe50-f90f-4410-8834-541262f537d3',
  'Pinturas y Acabados': '3b4f51f0-d59e-4773-8e08-38746bdea9a5',
  'Herramientas Manuales': '8134c9c3-6a1a-4fbb-8fd5-b97377c30bff',
  'Plomería': 'a7d37f61-e01c-49ea-aa1c-bd1481adae3d',
  'Electricidad': 'd080d9c1-38e5-4b43-b980-cca52b9cd1d5'
}

export const productsMock: ProductMock[] = [
  // ==================== 1. HERRAMIENTAS MANUALES ====================
  {
    id: "prod-001",
    name: "Martillo de Uña 16 oz",
    category: "Herramientas Manuales",
    stock: 48,
    purchasePrice: 8.50,
    salePrice: 16.99,
    offerPrice: 14.50,
    brand: "Stanley",
    color: "Amarillo / Negro",
    keyFeatures: [
      "Cabeza de acero forjado de alta resistencia",
      "Mango ergonómico antideslizante de fibra de vidrio",
      "Peso equilibrado de 16 oz ideal para uso general",
      "Uña curva para extracción fácil de clavos"
    ],
    description: "Martillo profesional de uña curva de 16 onzas. Ideal para carpintería, construcción y trabajos de bricolaje. El mango de fibra de vidrio absorbe impactos y reduce la fatiga."
  },
  {
    id: "prod-002",
    name: "Juego de Destornilladores 6 Piezas",
    category: "Herramientas Manuales",
    stock: 35,
    purchasePrice: 12.00,
    salePrice: 24.99,
    offerPrice: 19.99,
    brand: "Truper",
    color: "Rojo / Negro",
    keyFeatures: [
      "Incluye 3 planos y 3 de cruz (Phillips)",
      "Puntas magnéticas para mayor precisión",
      "Mangos ergonómicos con agarre antideslizante",
      "Acero al cromo-vanadio de alta durabilidad"
    ],
    description: "Set completo de 6 destornilladores profesionales. Perfecto para electricistas, mecánicos y uso doméstico. Las puntas magnéticas facilitan el trabajo en espacios reducidos."
  },
  {
    id: "prod-003",
    name: "Llave Ajustable 10 Pulgadas",
    category: "Herramientas Manuales",
    stock: 62,
    purchasePrice: 7.25,
    salePrice: 14.50,
    offerPrice: 12.90,
    brand: "Pretul",
    color: "Plateado / Negro",
    keyFeatures: [
      "Apertura máxima de 30 mm",
      "Mordazas de acero templado con acabado cromado",
      "Escala de medición en pulgadas y milímetros",
      "Diseño ergonómico para mayor torque"
    ],
    description: "Llave ajustable de 10\" fabricada en acero al carbono. Ideal para plomería, mecánica y trabajos de mantenimiento general. Acabado cromado resistente a la corrosión."
  },
  {
    id: "prod-004",
    name: "Cinta Métrica 5 Metros",
    category: "Herramientas Manuales",
    stock: 90,
    purchasePrice: 3.80,
    salePrice: 8.99,
    offerPrice: 7.50,
    brand: "Stanley",
    color: "Amarillo",
    keyFeatures: [
      "Cinta de acero de 25 mm de ancho",
      "Carcasa resistente a impactos",
      "Bloqueo automático y retorno controlado",
      "Doble escala: metros y pulgadas"
    ],
    description: "Cinta métrica profesional de 5 metros con carcasa de ABS de alta resistencia. Ideal para construcción, carpintería y mediciones precisas en obra."
  },
  {
    id: "prod-005",
    name: "Alicate de Corte Diagonal 7\"",
    category: "Herramientas Manuales",
    stock: 41,
    purchasePrice: 6.90,
    salePrice: 13.75,
    offerPrice: 11.99,
    brand: "Klein Tools",
    color: "Rojo / Negro",
    keyFeatures: [
      "Cuchillas de corte de precisión templadas",
      "Capacidad de corte hasta calibre 12 AWG",
      "Mangos aislados de 1000V",
      "Resorte de retorno para menor fatiga"
    ],
    description: "Alicate de corte diagonal profesional de 7 pulgadas. Diseñado para electricistas y técnicos. Mangos aislados ofrecen protección adicional en trabajos eléctricos."
  },

  // ==================== 2. ELECTRICIDAD ====================
  {
    id: "prod-006",
    name: "Interruptor Simple 15A 120V",
    category: "Electricidad",
    stock: 120,
    purchasePrice: 1.15,
    salePrice: 2.99,
    offerPrice: 2.49,
    brand: "Leviton",
    color: "Blanco",
    keyFeatures: [
      "Capacidad 15 amperios / 120 voltios",
      "Compatible con cajas estándar",
      "Terminales de tornillo para cableado seguro",
      "Diseño residencial y comercial ligero"
    ],
    description: "Interruptor simple de pared de 15A. Ideal para residencias y oficinas. Fácil instalación y compatible con la mayoría de placas de pared estándar."
  },
  {
    id: "prod-007",
    name: "Tomacorriente Dúplex 15A",
    category: "Electricidad",
    stock: 95,
    purchasePrice: 1.40,
    salePrice: 3.50,
    offerPrice: 2.99,
    brand: "Leviton",
    color: "Blanco",
    keyFeatures: [
      "Doble toma de 15A / 125V",
      "Diseño a prueba de manipulaciones (TR)",
      "Terminales de tornillo y back-wire",
      "Cumple normas UL y NOM"
    ],
    description: "Tomacorriente dúplex residencial de 15 amperios con diseño a prueba de manipulaciones. Ideal para cocinas, salas y áreas de uso general."
  },
  {
    id: "prod-008",
    name: "Cable THW 12 AWG (rollo 100m)",
    category: "Electricidad",
    stock: 28,
    purchasePrice: 85.00,
    salePrice: 149.00,
    offerPrice: 129.90,
    brand: "Condumex",
    color: "Negro",
    keyFeatures: [
      "Calibre 12 AWG (3.31 mm²)",
      "Aislamiento THW resistente a humedad",
      "Conductor de cobre electrolítico",
      "Uso en instalaciones residenciales y comerciales"
    ],
    description: "Rollo de 100 metros de cable THW calibre 12. Adecuado para circuitos de iluminación y tomacorrientes. Cumple con normas NOM-001-SEDE."
  },
  {
    id: "prod-009",
    name: "Foco LED 12W E27 Luz Fría",
    category: "Electricidad",
    stock: 200,
    purchasePrice: 1.80,
    salePrice: 4.50,
    offerPrice: 3.75,
    brand: "Philips",
    color: "Blanco Frío",
    keyFeatures: [
      "Consumo de solo 12W (equivalente a 75W)",
      "Flujo luminoso de 1100 lúmenes",
      "Vida útil estimada de 15,000 horas",
      "Base E27 estándar"
    ],
    description: "Bombillo LED de 12 watts con luz fría (6500K). Ahorro energético significativo y larga vida útil. Ideal para oficinas, cocinas y áreas de trabajo."
  },
  {
    id: "prod-010",
    name: "Caja de Registro Cuadrada 4x4",
    category: "Electricidad",
    stock: 75,
    purchasePrice: 2.10,
    salePrice: 4.99,
    offerPrice: 4.25,
    brand: "IUSA",
    color: "Gris",
    keyFeatures: [
      "Dimensiones 4\" x 4\" x 1.5\"",
      "Fabricada en acero galvanizado",
      "Incluye tapa y tornillos",
      "Uso empotrado o superficial"
    ],
    description: "Caja de registro metálica cuadrada de 4x4 pulgadas. Resistente y duradera, ideal para empalmes y derivaciones en instalaciones eléctricas."
  },

  // ==================== 3. PLOMERÍA ====================
  {
    id: "prod-011",
    name: "Llave de Paso 1/2\" PVC",
    category: "Plomería",
    stock: 85,
    purchasePrice: 2.50,
    salePrice: 5.99,
    offerPrice: 4.90,
    brand: "Rotoplas",
    color: "Blanco / Azul",
    keyFeatures: [
      "Diámetro nominal 1/2 pulgada",
      "Cuerpo de PVC de alta resistencia",
      "Válvula de bola de cierre rápido",
      "Compatible con tubería hidráulica estándar"
    ],
    description: "Llave de paso de PVC de 1/2\". Ideal para control de agua en instalaciones residenciales. Cierre hermético y larga durabilidad."
  },
  {
    id: "prod-012",
    name: "Codo 90° PVC 1/2\"",
    category: "Plomería",
    stock: 150,
    purchasePrice: 0.45,
    salePrice: 1.20,
    offerPrice: 0.95,
    brand: "Amanco",
    color: "Blanco",
    keyFeatures: [
      "Ángulo de 90 grados",
      "Diámetro 1/2 pulgada",
      "Unión cementable",
      "Resistente a presión y químicos"
    ],
    description: "Codo de PVC de 90° para tubería hidráulica de 1/2\". Fácil instalación con cemento solvente. Ideal para cambios de dirección en redes de agua."
  },
  {
    id: "prod-013",
    name: "Llave Mezcladora para Lavabo",
    category: "Plomería",
    stock: 22,
    purchasePrice: 28.00,
    salePrice: 59.90,
    offerPrice: 49.90,
    brand: "Helvex",
    color: "Cromo",
    keyFeatures: [
      "Acabado cromado brillante",
      "Cartucho cerámico de larga duración",
      "Incluye mangueras flexibles",
      "Diseño monocontrol"
    ],
    description: "Mezcladora monocontrol para lavabo con acabado cromado. Cartucho cerámico que garantiza cierre perfecto y suavidad de operación por años."
  },
  {
    id: "prod-014",
    name: "Sifón Flexible para Lavabo",
    category: "Plomería",
    stock: 60,
    purchasePrice: 3.20,
    salePrice: 7.50,
    offerPrice: 6.25,
    brand: "Coflex",
    color: "Blanco / Gris",
    keyFeatures: [
      "Material flexible de PVC",
      "Ajustable a diferentes alturas",
      "Incluye tuercas y empaques",
      "Fácil instalación sin herramientas especiales"
    ],
    description: "Sifón flexible universal para lavabos. Se adapta a la mayoría de instalaciones y facilita el mantenimiento del desagüe."
  },
  {
    id: "prod-015",
    name: "Tubería PVC Hidráulica 1/2\" (6m)",
    category: "Plomería",
    stock: 40,
    purchasePrice: 4.80,
    salePrice: 9.90,
    offerPrice: 8.50,
    brand: "Amanco",
    color: "Blanco",
    keyFeatures: [
      "Longitud de 6 metros",
      "Diámetro nominal 1/2\"",
      "Presión de trabajo 12.5 kg/cm²",
      "Ideal para agua fría"
    ],
    description: "Tubo de PVC hidráulico de 1/2\" en tramo de 6 metros. Ligero, resistente y de fácil instalación. Cumple normas para uso residencial."
  },

  // ==================== 4. PINTURAS Y ACABADOS ====================
  {
    id: "prod-016",
    name: "Pintura Vinílica Blanca 19 Litros",
    category: "Pinturas y Acabados",
    stock: 18,
    purchasePrice: 320.00,
    salePrice: 549.00,
    offerPrice: 489.00,
    brand: "Comex",
    color: "Blanco",
    keyFeatures: [
      "Rendimiento aproximado 10-12 m² por litro",
      "Acabado mate lavable",
      "Bajo olor y secado rápido",
      "Ideal para interiores"
    ],
    description: "Cubeta de 19 litros de pintura vinílica blanca de alta calidad. Excelente cobertura y acabado profesional. Perfecta para muros y plafones."
  },
  {
    id: "prod-017",
    name: "Esmalte Alquidálico Negro 1 Litro",
    category: "Pinturas y Acabados",
    stock: 45,
    purchasePrice: 85.00,
    salePrice: 149.00,
    offerPrice: 129.00,
    brand: "Sherwin Williams",
    color: "Negro",
    keyFeatures: [
      "Acabado brillante de alta resistencia",
      "Protección anticorrosiva",
      "Secado al tacto en 4-6 horas",
      "Ideal para metal y madera"
    ],
    description: "Esmalte alquidálico de 1 litro en color negro brillante. Excelente adherencia y durabilidad en superficies metálicas y de madera."
  },
  {
    id: "prod-018",
    name: "Rodillo de Pintura 9\" con Mango",
    category: "Pinturas y Acabados",
    stock: 70,
    purchasePrice: 4.50,
    salePrice: 9.99,
    offerPrice: 8.50,
    brand: "Truper",
    color: "Amarillo / Negro",
    keyFeatures: [
      "Ancho de 9 pulgadas",
      "Felpa de poliéster de alta densidad",
      "Mango ergonómico desmontable",
      "Ideal para superficies lisas y semi-rugosas"
    ],
    description: "Rodillo profesional de 9\" con mango telescópico. La felpa de calidad permite una aplicación uniforme de pintura con mínimo salpicado."
  },
  {
    id: "prod-019",
    name: "Brocha de Cerda Natural 3\"",
    category: "Pinturas y Acabados",
    stock: 55,
    purchasePrice: 3.80,
    salePrice: 8.50,
    offerPrice: 7.25,
    brand: "Purdy",
    color: "Madera / Negro",
    keyFeatures: [
      "Cerdas naturales de alta calidad",
      "Ancho de 3 pulgadas",
      "Mango de madera ergonómico",
      "Ideal para esmaltes y barnices"
    ],
    description: "Brocha profesional de 3\" con cerdas naturales. Ofrece un acabado suave y profesional en esmaltes, barnices y pinturas al aceite."
  },
  {
    id: "prod-020",
    name: "Thinner Estándar 1 Litro",
    category: "Pinturas y Acabados",
    stock: 80,
    purchasePrice: 18.00,
    salePrice: 32.00,
    offerPrice: 27.50,
    brand: "Comex",
    color: "Transparente",
    keyFeatures: [
      "Diluyente universal para esmaltes",
      "Limpieza de brochas y herramientas",
      "Evaporación controlada",
      "Presentación de 1 litro"
    ],
    description: "Thinner de uso general de 1 litro. Ideal para diluir esmaltes alquidálicos y limpiar herramientas de pintura."
  },

  // ==================== 5. FIJACIONES Y TORNILLERÍA ====================
  {
    id: "prod-021",
    name: "Caja de Tornillos Autorroscantes 1\" (100 pzas)",
    category: "Fijaciones y Tornillería",
    stock: 65,
    purchasePrice: 6.50,
    salePrice: 14.90,
    offerPrice: 12.50,
    brand: "Hilti",
    color: "Zincado",
    keyFeatures: [
      "100 piezas por caja",
      "Longitud 1 pulgada",
      "Cabeza Phillips",
      "Recubrimiento zincado anticorrosivo"
    ],
    description: "Caja con 100 tornillos autorroscantes de 1\". Ideales para fijación en metal, lámina y plásticos. Cabeza Phillips para fácil instalación."
  },
  {
    id: "prod-022",
    name: "Clavos para Concreto 2\" (1 kg)",
    category: "Fijaciones y Tornillería",
    stock: 40,
    purchasePrice: 9.00,
    salePrice: 18.50,
    offerPrice: 15.90,
    brand: "Truper",
    color: "Negro",
    keyFeatures: [
      "Punta endurecida para concreto",
      "Longitud de 2 pulgadas",
      "Presentación de 1 kilogramo",
      "Alta resistencia al corte"
    ],
    description: "Clavos de acero endurecido para concreto de 2\". Perfectos para fijar madera o elementos a muros y pisos de concreto."
  },
  {
    id: "prod-023",
    name: "Taquetes de Expansión 1/4\" (50 pzas)",
    category: "Fijaciones y Tornillería",
    stock: 90,
    purchasePrice: 5.20,
    salePrice: 11.90,
    offerPrice: 9.90,
    brand: "Fischer",
    color: "Gris",
    keyFeatures: [
      "Diámetro 1/4 de pulgada",
      "50 piezas por bolsa",
      "Expansión radial segura",
      "Ideal para concreto y block"
    ],
    description: "Bolsa con 50 taquetes de expansión de 1/4\". Ofrecen fijación segura en concreto, block y ladrillo. Compatibles con tornillos de máquina."
  },
  {
    id: "prod-024",
    name: "Cinta de Aislar Negra 18m",
    category: "Fijaciones y Tornillería",
    stock: 110,
    purchasePrice: 1.90,
    salePrice: 4.50,
    offerPrice: 3.75,
    brand: "3M",
    color: "Negro",
    keyFeatures: [
      "Longitud de 18 metros",
      "Ancho estándar de 19 mm",
      "Aislamiento eléctrico hasta 600V",
      "Adhesivo de alta adherencia"
    ],
    description: "Cinta de aislar eléctrica negra de 18 metros. Ideal para empalmes, protección de cables y trabajos de mantenimiento eléctrico."
  },
  {
    id: "prod-025",
    name: "Cinta Doble Cara Espuma 1\" x 5m",
    category: "Fijaciones y Tornillería",
    stock: 50,
    purchasePrice: 7.80,
    salePrice: 16.90,
    offerPrice: 14.50,
    brand: "3M",
    color: "Gris",
    keyFeatures: [
      "Ancho de 1 pulgada",
      "Longitud de 5 metros",
      "Espuma de alta densidad",
      "Adhesión en ambas caras"
    ],
    description: "Cinta de doble cara de espuma de 1\" x 5 metros. Excelente para montaje de espejos, letreros, molduras y elementos decorativos sin clavos."
  }
];

export const MOCK_PRODS: DBProduct[] = productsMock.map((p) => ({
  name: p.name,
  description: p.description,
  key_features: formatKeyFeatures(p.keyFeatures),
  stock: p.stock,
  purchase_price: p.purchasePrice,
  sale_price: p.salePrice,
  offer_price: p.offerPrice,
  brand: p.brand,
  color: p.color,
  stock_status: 'Normal',
  status_tag: 'Nuevo',
  is_offer: false,
  is_stock: true,
  category_id: (categoryIds as any)[p.category]
} as any));

// const r = MOCK_PRODS.map(productService.insertProduct);
// console.log(await Promise.all(r))