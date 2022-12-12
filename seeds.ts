import 'dotenv/config';
import mongoose from "mongoose";
import { Brand as BrandType, Category as CategoryType, Product as ProductType, User as UserType } from "types";
import Brand from "./models/Brand.model";
import Category from "./models/Category.model";
import Order from "./models/Order.model";
import Product from "./models/Product.model";
import User from "./models/User.model";

if(!process.env.DATABASE_URL) throw new Error("DATABASE_URL is needed")

const seedBrands: Array<BrandType> = [
  {description: "Asus", imageSrc: "/public/brands/asus.webp"},
  {description: "EVGA", imageSrc: "/public/brands/evga.webp"},
  {description: "HyperX", imageSrc: "/public/brands/hyperx.webp"},
  {description: "Intel", imageSrc: "/public/brands/intel.webp"},
  {description: "Lenovo", imageSrc: "/public/brands/lenovo.webp"},
  {description: "Logitech", imageSrc: "/public/brands/logitech.webp"},
  {description: "Razer", imageSrc: "/public/brands/razer.webp"},
  {description: "Samsung", imageSrc: "/public/brands/samsung.webp"},
]

const seedCategories: Array<CategoryType> = [
  {description: "Gaming Desktops", imageSrc: "/public/categories/gaming-desktops-category.webp"},
  {description: "Gaming Laptops", imageSrc: "/public/categories/gaming-laptops-category.webp"},
  {description: "Gaming Monitors", imageSrc: "/public/categories/gaming-monitors-category.webp"},
  {description: "PC Components", imageSrc: "/public/categories/pc-components-category.webp"},
  {description: "Keyboards", imageSrc: "/public/categories/keyboards-category.webp"},
  {description: "PC Headsets", imageSrc: "/public/categories/pc-headsets-category.webp"},
  {description: "Mice", imageSrc: "/public/categories/mice-category.webp"},
  {description: "Streaming", imageSrc: "/public/categories/streaming-category.webp"},
  {description: "Joysticks", imageSrc: "/public/categories/joysticks-category.webp"},
  {description: "PC Games", imageSrc: "/public/categories/pc-games-category.webp"},
]

const seedUsers: Array<UserType> = [
  // Admin user
  {
    "firstName": "Juan Ignacio",
    "lastName": "Quinteros Parada",
    "email": "juanquinteros@uade.edu.ar",
    // A$d12345
    "password": "$2a$08$g9oxOKvKdYRHibTCgE/g4ekZo9AFeMBRiTluV8t0VvlvSJLYRR48K",
    "address": {
      "province": "",
      "city": "",
      "zip": "",
      "address1": "False 123"
    },
    "payment": {
      "cardName": "Juan Ignacio Quinteros Parada",
      "cardNumber": "",
      "expDate": "",
      "cvv": ""
    },
    "isAdmin": true,
    "avatar": "/public/avatars/a16f353a-a734-4bb1-a245-881a6e45baae.png",
  },
  // Client user
  {
    "firstName": "Isaac",
    "lastName": "Newton",
    "email": "inewton@uade.edu.ar",
    // A$d12345
    "password": "$2a$08$K6n7XUd6VHgcTOOywASTgOx3.oT2UfsYCWsL5d3xsxzU5jF/V8vNa",
    "address": {
      "province": "CABA",
      "city": "CABA",
      "zip": "1406",
      "address1": "Miraflores 2060"
    },
    "payment": {
      "cardName": "Isaac Newton",
      "cardNumber": "1234 5678 9012 3456",
      "expDate": "12/23",
      "cvv": "420"
    },
    "isAdmin": false,
    "avatar": "/public/avatars/a5d942e6-82ef-4bd3-bf15-28ffcdbdfa93.jpg",
  },
]

const seedProducts: Array<ProductType> = [
  {
    "image": "/public/products/evga-rtx-3060.jpg",
    "brand": "EVGA",
    "productModel": "RTX 3060",
    "price": 599.99,
    "stock": 16,
    "category": "PC Components",
    "description": "UNIDAD DE PROCESAMIENTO DE GRÁFICOS:NVIDIA® GeForce RTX™ 3060\n\nINTERFAZ:PCI Express® Gen 4\n\nNÚCLEOS CUDA®:3584\n\nRELOJES CENTRALES:Potencia: 1807 MHz\n\nVELOCIDAD DE MEMORIA:15 Gbps\n\nMEMORIA:GDDR6 DE 12 GB\n\nBUS DE MEMORIA:192 bits\n\nSALIDA:DisplayPort x 3 (v1.4) / HDMI x 1 (Admite 4K@120Hz según lo especificado en HDMI 2.1)\n\nCONSUMO DE ENERGÍA: 170W\n\nCONECTORES DE ALIMENTACIÓN: 8 pines x 1\n\nPSU RECOMENDADA: 550w\n\nDIMENSIÓN DE LA TARJETA (MM): 305 x 120 x 42 mm\n\nPANTALLAS MÁXIMAS: 4",
    "name": "EVGA RTX 3060",
  },
  {
    "image": "/public/products/evga-rtx-3070.jpg",
    "brand": "EVGA",
    "productModel": "RTX 3070",
    "price": 799.99,
    "stock": 7,
    "category": "PC Components",
    "description": "Tecnología EVGA iCX3\nLED ARGB ajustable\nConstruido para EVGA Precision X1\nNúcleos de trazado de rayos de segunda generación\nNúcleos tensor\nPCI Express® Gen 4\nMicrosoft DirectX® 12 Ultimate\nMemoria gráfica GDDR6\nNVIDIA DLSS\nNVIDIA® GeForce Experience ™\nNVIDIA G-SYNC®\nNVIDIA GPU Boost ™\nControladores Game Ready\nAPI Vulkan RT, OpenGL 4.6\nDisplayPort 1.4a, HDMI 2.1\nHDCP 2.3\nListo para VR\nEspecificaciones:\nReloj de aceleración: 1815 MHz\nReloj de memoria: 14000 MHz efectivo\nNúcleos CUDA: 5888\nTipo de bus: PCIe 4.0\nDetalle de la memoria: 8192 MB GDDR6\nAncho de bits de memoria: 256 bits\nAncho de banda de memoria: 448 GB / s\nLogotipo de LED: ARGB\nAltura: 5.38 in - 136.75 mm\nLongitud: 11,81 pulgadas - 300 mm\nAncho: 2,75 ranuras\nFuente de alimentación de 650 vatios o más.\nPlaca madre compatible con PCI Express, PCI Express 2.0, PCI Express3.0 o PCI Express 4.0 con una ranura para gráficos.\nDos powerdongles PCIe de 8 pines o 6 + 2 pines disponibles\nWindows 10 de 64 bits",
    "name": "EVGA RTX 3070",
  },
  {
    "image": "/public/products/evga-rtx-3080.jpg",
    "brand": "EVGA",
    "productModel": "RTX 3080",
    "price": 999.99,
    "stock": 5,
    "category": "PC Components",
    "description": "PLACA DE VIDEO EVGA GeForce RTX 3080 FTW3 ULTRA GAMING\n\nUna fuerza innegable esta aquí. Los planetas se han alineado a la vez que la mayor experiencia en gaming ha emergido.\n\nLAS PLACAS EVGA GEFORCE RTX SERIE 3000 HAN ARRIBADO\nEstas placas son colosalmente poderosas en múltiples sentidos, dándote todo un nuevo nivel de performance. Son potenciadas por la nueva arquitectura NVIDIA® Ampere que duplica al doble la performance en ray tracing y performance AI con sus núcleos de RT, Tensor y sus nuevos multiprocesadores de streaming. La EVGA RTX 3000 Series es la absoluta definición en performance.\n\nLa serie EVGA Geforce RTX 3080 entrega ese rendimiento supremo que anhelan los jugadores, gracias al uso de la arquitectura Nvidia Ampere. Esta fabricada con RT Cores, y Tensor Cores mejorados, nuevos multiprocesadores de streaming, y memoria G6X ultrarrápida para una increíble experiencia en juegos. Combinado con la próxima generación en diseño, refrigeración y overclocking con EVGA Precision X1, la serie EVGA geforce RTX3080 es la definición absoluta de maximo rendimiento.\n\nEspecificaciones Tecnicas:\n\nRendimiento\nNVIDIA RTX 3080\n8704 CUDA Cores\n1800 MHz Boost Clock\n489.6GT/s Texture Fill Rate\n\nMemoria\n10240 MB, 320 bit GDDR6X\n19000 MHz (effective)\n760 GB/s Memory Bandwidth\n\nRefrigeración\niCX3 Technology\nLED: ARGB\n\nInterfaz\nPCIe 4.0 16x\nHDMI, DisplayPort, DisplayPort, DisplayPort\n\nResolución y Actualizar\nMax Monitors Supported:\n\nMax Refresh Rate\nMax Analog :\nMax Digital : 7680x4320\n\nDimensiones\nHeight: 5.38 in - 136.75mm\nLength: 11.81 in - 300mm\nWidth: 2.75 Slots\n\nSoporte de Sistema Operativo\nWindows 10 64bit\n\nRequerimientos\nMinimum of a 750 Watt power supply.\nThree available 8-pin or 6+2pin PCIe power dongles\nTotal Power Draw : 320 Watts",
    "name": "EVGA RTX 3080",
  },
  {
    "image": "/public/products/8b7625b8-836d-4158-bab7-0fd7edec1a08.jpg",
    "name": "Intel i7 12700 4.9Ghz",
    "category": "PC Components",
    "brand": "Intel",
    "productModel": "i7 12700",
    "price": 299.99,
    "stock": 4,
    "description": "CPU Intel de 12va generación",
  },
  {
    "image": "/public/products/9e3a03d9-245e-44f7-bdfb-ac6f8026093d.jpg",
    "name": "Teclado Logitech Pop Keys QWERTY",
    "category": "Keyboards",
    "brand": "Logitech",
    "productModel": "920-010713",
    "price": 59.99,
    "stock": 25,
    "description": "Innovadores en diseño y tecnología, Logitech se encarga de brindar la mejor experiencia de uso para sus usuarios. Sus teclados resaltan por ser resistentes y muy de buena calidad, por lo que podrás disfrutarlos por un largo tiempo.\n\nTecnología antighosting\nEste dispositivo tiene teclas antighosting. Esta cualidad es indispensable si requerís de un uso intensivo del periférico. Gracias a esto podrás evitar fallas al tocar varias teclas al mismo tiempo. ",
  },
  {
    "image": "/public/products/ac70703e-d2e0-47b4-b674-699b87c02732.jpg",
    "name": "Razer Kraken X Lite Headset",
    "category": "PC Headsets",
    "brand": "Razer",
    "productModel": "Kraken X Lite",
    "price": 39.99,
    "stock": 10,
    "description": "Marca Razer\nLínea Kraken\nModelo X Lite\nModelo alfanumérico RZ04-02950100-R381\nFormato Headset\nBluetooth No\nMicrófono Sí\nUnidad de diafragma 40 mm\nImpedancia 32 O\nRespuesta en frecuencia 12 Hz x 28 kHz\nSensibilidad 3 dB\nLargo del cable 1.3 m\nGamer Sí\n\n• Respuesta de frecuencia: 12 Hz - 28 kHz\n• Impedancia: 32 Ohm @ 1 kHz\n• Sensibilidad (@ 1 kHz): TBD\n• Controladores: 40 mm, con imanes de neodimio.\n• Diámetro interno del audífono: 65 x 44 mm.\n• Tipo de conexión: analógico 3.5 mm\n• Longitud del cable: 1.3 m / 4.27 pies.\n• Aprox. peso: 230g / 0.50lbs\n• Almohadillas ovales: diseñadas para una cobertura total de la oreja con cuero sintético, para aislamiento y comodidad del sonido.\n\nMICROFONO\n• Respuesta de frecuencia: 100 Hz - 10 kHz\n• Relación señal / ruido: 60 dB\n• Sensibilidad (@ 1 kHz): -45 ± 3 dB\n• Patrón de recogida: auge de ECM unidireccional\n\nCOMPATIBILIDAD\n• Dispositivos con conector de audio de 3,5 mm\n• Uso de audio + micrófono: dispositivos con conector combinado de audio + micrófono de 3,5 mm\n• Uso del cable del adaptador del divisor de audio / micrófono: dispositivos con conectores de audio y micrófono separados de 3.5 mm\n• Sonido envolvente: solo disponible en Windows 10 de 64 bits.",
  },
  {
    "image": "/public/products/81698609-0fad-40c5-842f-7b423e7efc46.webp",
    "name": "Notebook Asus Rog Strix G15 15.6 Ryzen 7 Rtx 3050 16gb 512gb",
    "category": "Gaming Laptops",
    "brand": "Asus",
    "productModel": "Rog Strix G15",
    "price": 1599.99,
    "stock": 5,
    "description": "ESPECIFICACIONES TECNICAS:\n\nMarca: ASUS\nSerie: ROG Strix G15\nNúmero de modelo del producto: G513QC-BB74\nTamaño del área de visualización de la pantalla con pie: 15.6 Pulgadas\nMáxima resolución de pantalla: 1920 x 1080 Píxeles\nProcesador: 3.2 GHz AMD Ryzen 7 5800H 8-Core\nRAM: 16 GB Ddr 4\nVelocidad de memoria 3200 MHz\nCapacidad Maxima Ram: 32Gb\nPlaca de Video: NVIDIA GeForce RTX 3050 with 4 GB GDDR6 VRAM\nSistema operativo: Windows 10 Home\nPeso del producto: 2,3 Kg\nDimensiones del producto: 35.4 x 25.9 x 2.72 cm\nMarca del procesador: Amd\nNúmero de núcleos: 8\nTipo de memoria del equipo: DDR4\nTamaño de memoria flash: 512GB M.2 PCIe SSD",
  },
  {
    "image": "/public/products/241db949-6246-44fe-a191-59e09f7ad354.webp",
    "name": "Monitor gamer Samsung F24T35 led 24\" azul y gris oscuro 100V/240V",
    "category": "Gaming Monitors",
    "brand": "Samsung",
    "productModel": "F24T35",
    "price": 179.99,
    "stock": 25,
    "description": "Una experiencia visual de calidad\nEste monitor de 24\" te va a resultar cómodo para estudiar, trabajar o ver una película en tus tiempos de ocio. Asimismo, su resolución de 1920 x 1080 te permite disfrutar de momentos únicos gracias a una imagen de alta fidelidad. Su tiempo de respuesta de 5 ms lo hace ideal para gamers y cinéfilos porque es capaz de mostrar imágenes en movimiento sin halos o bordes borrosos.",
  },
  {
    "image": "/public/products/d2339906-b4f0-4f50-9262-118fc338f885.webp",
    "name": "Pc Lenovo Legion T5 I7 16gb 1tb Ssd Rtx 3060 Ed New Game +",
    "category": "Gaming Desktops",
    "brand": "Lenovo",
    "productModel": "Lenovo Legion T5",
    "price": 1199,
    "stock": 5,
    "description": "",
  }
]

const opts = {
  useNewUrlParser: true,
  connectTimeoutMS: 20000,
  useUnifiedTopology: true
};

const seedDB = async function () {
  // Clean database
  console.log("🧹 Cleaning DB...")
  await Order.deleteMany({})
  await User.deleteMany({})
  await Product.deleteMany({})
  await Category.deleteMany({})
  await Brand.deleteMany({})

  // Insert documents
  console.log("🪄 Creating data...")
  await Brand.insertMany(seedBrands)
  await Category.insertMany(seedCategories)
  await User.insertMany(seedUsers)
  await Product.insertMany(seedProducts)

  console.log("✅ Done.")
}

mongoose.connect(process.env.DATABASE_URL, opts)
  .then(seedDB)
  .then(() => {
    mongoose.connection.close()
  })
  .catch((_e: any) => {
    console.log(`❌ Error connecting MongoDB.`)
    process.exit(1)
  })
