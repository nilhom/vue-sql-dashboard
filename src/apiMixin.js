// apiMixin.js
import { fetchData } from './apiCall.js';
import {Bar} from "vue-chartjs";

export const apiMixin = {
    props: {
        newTableSelected: {
            type: String,
        },
        sql_query: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            loaded: false,
            chartData: null,
            chartOptions: {
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            },
            stateToSave: null,
            loadedState: null,
        };
    },
    methods: {
        loadData() {
            this.loaded = false;

            console.log("apiMixin.js: loadData()", this.sql_query, this.newTableSelected)

            if (!this.sql_query || this.sql_query.length === 0 || !this.newTableSelected || this.newTableSelected.length === 0) {

                // Create an empty chart
                this.chartData = {
                    labels: Array.from({ length: 10 }, (_, index) => `Label ${index + 1}`),
                    datasets: [
                        {
                            backgroundColor: 'rgba(0,0,0,0)',
                            borderColor: 'rgba(0,0,0,0)',
                            borderWidth: 1,
                            label: 'Empty Chart',
                            data: Array(10).fill(0)
                        }
                    ]
                };

                // Save the state
                this.stateToSave = {
                    chartData: this.chartData,
                    chartOptions: this.chartOptions,
                };

                this.loaded = true;
            } else {
                // Replace the table name in the query
                const sql_query_with_table = this.sql_query.replaceAll("{{TABLE_NAME}}", this.newTableSelected)
                // Fetch data and populate the chart
                fetchData(sql_query_with_table)
                    .then(response => {
                        if (response && Array.isArray(response) && response.length > 0) {
                            const firstItem = response[0];
                            const labelField = Object.keys(firstItem).find(
                                key => typeof firstItem[key] === 'string'
                            );
                            const dataField = Object.keys(firstItem).find(
                                key => typeof firstItem[key] === 'number'
                            );

                            this.chartData = {
                                labels: response.map(item => item[labelField]),
                                datasets: [
                                    {
                                        backgroundColor: 'rgba(75,192,192,0.39)',
                                        borderColor: 'rgba(75,192,192,1)',
                                        borderWidth: 1,
                                        label: `Data by ${labelField}`,
                                        data: response.map(item => item[dataField])
                                    }
                                ]
                            };

                            // Save the state
                            this.stateToSave = {
                                chartData: this.chartData,
                                chartOptions: this.chartOptions,
                            };

                            this.loaded = true;
                        } else {
                            console.error('Invalid response or data structure:', response);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            }
        }
    },
    components: { Bar },
    watch: {
        sql_query: 'loadData',
        newTableSelected: 'loadData'
    },
    mounted() {
        this.loadData();
    }
};
