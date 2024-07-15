import { Component } from '@angular/core';
import { DataService } from '../../../service/data.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {
  basicData: any;
  basicOptions: any;
  dashboardCard!:any;
  constructor( private dataService:DataService
  ) { }
  ngOnInit() {
    this.dataService.getData('dashboardCard').subscribe((res: any) => {
        if (res.success) {
          this.dashboardCard = res.result;
        }
    })
    this.dataService.getData('dashboardChart').subscribe((res: any) => {
        if (res.success) {
          this.basicData = {
            labels: [  'January', 'February', 'March', 'April',   'May', 'June', 'July', 'August', 'September',   'October', 'November', 'December'],
            datasets: [
                {
                    label: '2024',
                    data: res.result,
                    tension: 0.4,
                    backgroundColor: [
                        '#0abbbb',
                        '#0abbbb',
                        '#FFCE45',
                        '#ff6200',
                        '#00ffbf',
                        '#006666',
                        '#0abbbb',
                        '#FFCE45',
                        '#0abbbb',
                        '#ff6200',
                        '#00ffbf',
                        '#006666',
                    ],
                    borderColor: '#42A5F5',
                },
            ],
        };
        this.basicOptions = {
            title: {
                display: true,
                text: 'Article Views',
                fontSize: 32,
                position: 'top',
            },
        };
        }
    })

  }
}
