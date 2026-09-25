# EcoPulse - Environmental Media Intelligence & ESG Verification Platform

An enterprise platform for field media processing, computer vision EXIF verification, and automated ESG impact documentation. Powered by Cloudinary dynamic transformation pipelines and multi-spectral telemetry verification.

---

## Architectural Overview

EcoPulse ingests heterogeneous field media (satellite imagery, drone orthomosaics, thermal scans, ROV underwater captures, and ground photos), routes them through Cloudinary transformation pipelines, and cross-examines EXIF metadata against spatial GIS telemetry. The platform generates immutable impact audit trails compliant with CSRD and ISSB corporate sustainability disclosure standards.

---

## Core Capabilities & Cloudinary Integration

### 1. Dynamic Media Transformation Pipeline
- **Smart Focus Cropping**: Auto-calculates subject geometry (`c_fill,g_auto`) for low-bandwidth satellite nodes.
- **Spectral Vegetation Enhancement**: Applies outdoor color tuning (`e_improve:outdoor`) for precise canopy spectroscopy.
- **Verification Watermarking Overlay**: Dynamically stamps cryptographic verification metadata onto exported assets (`l_text:Inter_20_bold:VERIFIED_ECOPULSE`).
- **Canopy Analysis Filters**: Spectral tinting for automated foliage density calculation.

### 2. Computer Vision & EXIF Audit Engine
- **Telemetry Analysis**: Evaluates canopy density percentage, ocean plastic tonnage, photovoltaic array health, and micro-debris count.
- **EXIF & Telemetry Cross-Examination**: Validates hardware metadata against satellite land-use telemetry to eliminate data distortion risks.
- **Authenticity Scoring**: Computes cryptographic trust confidence scores (0-100%) for each ingested asset.

### 3. Enterprise Intelligence Dashboard
- **Telemetry Visualizations**: Real-time carbon sequestration velocity and verification confidence distribution.
- **Geospatial GIS Explorer**: Interactive mapping of geotagged field nodes with media preview drawers.
- **Temporal Before / After Comparison**: Split-screen slider comparing baseline vs restored environmental assets.
- **Executive PDF Report Export**: Generates downloadable, audit-ready PDF reports for corporate ESG compliance.

---

## System Requirements & Technology Stack

- **Frontend Architecture**: Next.js 14 (App Router), React 19, TypeScript, Tailwind CSS
- **Media Engine**: Cloudinary URL Gen SDK (`@cloudinary/url-gen`, `@cloudinary/react`)
- **Data & Mapping**: Recharts, Leaflet GIS Engine
- **Report Generation**: jsPDF, html2canvas

---

## Installation & Setup Guide

### 1. Repository Setup

```bash
git clone https://github.com/your-org/ecopulse.git
cd ecopulse
```

### 2. Dependency Installation

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=demo
```

### 4. Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your web browser.

---

## Verification & Production Build

To verify type safety and generate a production build:

```bash
npm run build
```

---

## License

Distributed under the MIT License. See LICENSE for details.
