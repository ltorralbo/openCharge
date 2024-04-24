import { Component, OnInit } from '@angular/core';
import { OpenChargeMapService } from './open-charge-map.service';
import { Subject, takeUntil } from 'rxjs';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dhemax';
  currentPage = 1;
  totalPages = 0;
  rowsPerPage = 10;
  data: any[] = []; 
  filteredData: any[] = [];
  tableData: any[] = [];
  markers: any[] = []; 
  searchTerms: { [key: number]: string } = {};
  private unsubscribe$ = new Subject<void>();
  private map: any;

  constructor(private openChargeMapService: OpenChargeMapService) {
    this.markers = [];
  }

  ngOnInit(): void {
   this.getDataPoint();

  }

  getDataPoint() {
    this.openChargeMapService
      .getChargers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (points) => {
          this.data = points;
          this.totalPages = Math.ceil(this.data.length / this.rowsPerPage);

          this.filteredData = [...this.data];
          this.displayData();
          this.initMap();
          this.addPointsToMap();
        },
        (err) => console.log(err)
      );
  }

  displayData(): void {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    const displayData = this.filteredData.slice(start, end);

    const tbody = document.getElementById(
      'tableBody'
    ) as HTMLTableSectionElement;
    tbody.innerHTML = '';

    this.tableData = displayData;
    for (let record of displayData) {
      const row = tbody.insertRow();
      row.insertCell().innerText = record.ID;
      row.insertCell().innerText = record.StatusType.Title;
      row.insertCell().innerText = record.OperatorInfo.Title;
      row.insertCell().innerText = record.Connections.length.toString();
      row.insertCell().innerText = `${record.AddressInfo.Latitude}, ${record.AddressInfo.Longitude}`;
      row.insertCell().innerText = record.AddressInfo.Country.Title;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.displayData();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.displayData();
    }
  }

  filterTable(columnIndex: number, event: any): void {
    this.searchTerms[columnIndex] = event.target.value.trim().toLowerCase();

    this.filteredData = this.data.filter((record) => {
      return Object.keys(this.searchTerms).every((key: any) => {
        const searchTerm = this.searchTerms[key];
        if (!searchTerm) return true; 

        const columnValue = String(this.getColumnValue(record, +key))
          .trim()
          .toLowerCase();
        return columnValue.includes(searchTerm);
      });
    });

    this.totalPages = Math.ceil(this.filteredData.length / this.rowsPerPage);
    this.currentPage = 1;
    this.displayData();
    this.updateMarkersOnMap();
  }

  getColumnValue(record: any, columnIndex: number): any {
    switch (columnIndex) {
      case 0:
        return record.ID;
      case 1:
        return record.StatusType.Title;
      case 2:
        return record.OperatorInfo.Title;
      case 3:
        return record.Connections.length.toString();
      case 4:
        return `${record.AddressInfo.Latitude}, ${record.AddressInfo.Longitude}`;
      case 5:
        return record.AddressInfo.Country.Title;
    }
  }

  private sortDirections: boolean[] = [true, true, true, true, true, true];

  sortTable(columnIndex: number): void {
    const isAscending = this.sortDirections[columnIndex];

    this.filteredData.sort((recordA, recordB) => {
      let valueA: string | number;
      let valueB: string | number;

      switch (columnIndex) {
        case 0:
          valueA = recordA.ID;
          valueB = recordB.ID;
          return isAscending ? +valueA - +valueB : +valueB - +valueA;
        case 1:
          valueA = recordA.StatusType.Title;
          valueB = recordB.StatusType.Title;
          break;
        case 2:
          valueA = recordA.OperatorInfo.Title;
          valueB = recordB.OperatorInfo.Title;
          break;
        case 3:
          valueA = recordA.Connections.length;
          valueB = recordB.Connections.length;
          return isAscending ? +valueA - +valueB : +valueB - +valueA;
        case 4:
          valueA = `${recordA.AddressInfo.Latitude}, ${recordA.AddressInfo.Longitude}`;
          valueB = `${recordB.AddressInfo.Latitude}, ${recordB.AddressInfo.Longitude}`;
          break;
        case 5:
          valueA = recordA.AddressInfo.Country.Title;
          valueB = recordB.AddressInfo.Country.Title;
          break;
        default:
          valueA = '';
          valueB = '';
      }

      return isAscending
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });

    this.sortDirections[columnIndex] = !isAscending;

    this.displayData();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [20, 0], 
      zoom: 2, 
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }

  myIcon = L.icon({
    iconUrl: ' https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconSize: [20, 30],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});
 
  private addPointsToMap(): void {


    this.filteredData.forEach((point) => {
      const marker = L.marker([
        point.AddressInfo.Latitude,
        point.AddressInfo.Longitude,
      ],{icon: this.myIcon})
        .addTo(this.map)
        .bindPopup(`<b>${point.AddressInfo.Title}</b>`);

      this.markers.push(marker);
    });
  }

  updateMarkersOnMap(): void {
    this.markers.forEach((marker) => {
      this.map.removeLayer(marker);
    });

    this.markers = [];

    this.filteredData.forEach((point) => {
      const marker = L.marker([
        point.AddressInfo.Latitude,
        point.AddressInfo.Longitude,
      ]);
      marker.addTo(this.map);

      this.markers.push(marker);
    });

    if (this.markers.length > 0) {
      const group = L.featureGroup(this.markers);
      this.map.flyToBounds(group.getBounds());
    }
  }
}
