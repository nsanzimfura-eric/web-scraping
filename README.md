# Web Scraping Project with Node.js and Playwright

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Requirements](#requirements)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

## Introduction

This project scrapes content from a Shopee merchant page and individual product pages. The scraped data is then posted to our server via an API.

## Features

- Automates login to Shopee
- Handles captcha via a Python script
- Scrapes data from a Shopee merchant page
- Scrapes details from individual product pages
- Updates scraped data to the server using an API

## Requirements

- Node.js
- Playwright
- Python (for captcha handling)
- account to scrap

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/nsanzimfura-eric/web-scraping.git
   ```
2. Navigate into the project directory:

   ```bash
   cd web-scraping
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Add your `.env` variables:

   ```bash
   cp .env.sample .env
   ```

5. Update `.env` with your API endpoints and Shopee account details.

## Usage

1. To start the scraper:
   ```bash
   npm start
   ```

## Contributing

I, [Nsanzimfura Eric](https://github.com/nsanzimfura-eric) contributed to this web-scraping app, and an author.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
