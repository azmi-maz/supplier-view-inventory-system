<a name="readme-top"></a>
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/azmi-maz/supplier-view-inventory-system/main)

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/azmi-maz/supplier-view-inventory-system">
    <img src="https://user-images.githubusercontent.com/87229604/208306950-c85c5315-9ebf-4991-9ff7-fe0b83cad68a.gif" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Biochemistry Inventory System</h3>

  <p align="center">
    <br />
    <a href="https://github.com/azmi-maz/supplier-view-inventory-system"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://docs.google.com/spreadsheets/d/112cK9eQ46rDTaCUN1-XG0J1UbEctLL5OyU2uwpctmBY/edit?usp=share_link">View Demo</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#google-sheets-guide">Google sheets guide/a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This google sheet was created to facilitate communication by producing reports between laboratory users, the procurement team, and suppliers on quantity on hand items and active purchase orders.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
* ![Google Drive](https://img.shields.io/badge/Google%20Drive-4285F4?style=for-the-badge&logo=googledrive&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This project must be linked with the main inventory system.
<br />

<a href="https://github.com/azmi-maz/inventory-system-for-biochem"><strong>See repo here»</strong></a>

### Installation

1. Use this blank google sheet. (<a href="https://docs.google.com/spreadsheets/d/1KIh-KPHvaxpolmzN2NEUr4tjh-nztMGPpGZwCHf5uEY/edit?usp=share_link"><strong>Use this link »</strong></a>)
2. Install Google Apps Script GitHub Assistant extension.
3. Clone this repo.
4. Login to GitHub using the extension with you GitHub token.
5. Pull the main branch.

### Google sheets guide

*protected sheet
<br />
**hidden sheet
<br />


| Sheet Name | User Restriction |
| ----------- | ----------- |
| QOH PR | * |
| QOH FOC | * |
| Pending PO | * |
| BestExp |  |
| Batch List | * |


Note: to document formulas used in each sheets


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
<p>
  <ul>
    <li> QOH PR, QOH FOC, and Pending PO - Click the "Update" button to refresh the tables with current information.
      <br />
      <br />
    <li> BestExp:
        <ol>
           <li> Click the 'update' button to get the pending/incomplete purchase orders.
           <li> Enter the delivery date above and select the drop-down list for first, second or third offer.
           <li> Enter the best expiry date offered for desired items only. Other items can be left blank.
           <li> Once all information was entered correctly, click the "Enter' button to send the data to the user for evaluation.
      </ol>
      <br />
    <li> Batch List - After user has evaluated the offers, approved list of batched items are displayed in the table automatically.
   </ul>
</p>
Note: to continue documentation as user guide.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Supplier best expiry table.
- [ ] Supplier QOH view only.
- [ ] Batch list view.
- [ ] Changed batch number creation to handle multiple offers.


<!-- See the [open issues](https://github.com/azmi-maz/supplier-view-inventory-system/issues) for a full list of proposed features (and known issues). -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

