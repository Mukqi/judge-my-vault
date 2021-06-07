<template #cell(Slots)="data">
            <!-- Gonna want a table with Perks 0-6.  0,1-2,3-4,5,6 -->
            <table class="slots-table" v-if="data.item['Tier']=='Legendary' || data.item['Tier']=='Epic'">
                <tr>
                    <td colspan="2">{{ data.item["Perks 0"] }}</td>
                </tr>
                <tr>
                    <td>{{ data.item["Perks 1"] }}</td>
                    <td>{{ data.item["Perks 2"] }}</td>
                </tr>
                <tr>
                    <td>{{ data.item["Perks 3"] }}</td>
                    <td>{{ data.item["Perks 4"] }}</td>
                </tr>
                <tr>
                    <td colspan="2">{{ data.item["Perks 5"] }}</td>
                </tr>
                <tr>
                    <td colspan="2">{{ data.item["Perks 6"] }}</td>
                </tr>
            </table>
            <table class="slots-table" v-else-if="data.item['Tier']=='Rare'">
                <tr>
                    <td colspan="3">{{ data.item["Perks 0"] }}</td>
                </tr>
                <tr>
                    <td colspan="3">{{ data.item["Perks 1"] }}</td>
                    
                </tr>
                <tr>
                    <td colspan="3">{{ data.item["Perks 2"] }}</td>
                </tr>
                <tr>
                    <td colspan="3">{{ data.item["Perks 3"] }}</td>
                </tr>
                <tr>
                    <td colspan="3">{{ data.item["Perks 4"] }}</td>
                </tr>
            </table>
            <table class="slots-table" v-else-if="data.item['Tier']=='Exotic'">
                <tr>
                    <td colspan="3">{{ data.item["Perks 0"] }}</td>
                </tr>
                <tr>
                    <td colspan="3">{{ data.item["Perks 1"] }}</td>
                    
                </tr>
                <tr>
                    <td colspan="3">{{ data.item["Perks 2"] }}</td>
                </tr>
                <tr>
                    <td colspan="3">{{ data.item["Perks 3"] }}</td>
                </tr>
                <tr>
                    <td colspan="3">{{ data.item["Perks 4"] }}</td>
                </tr>
                <tr>
                    <td colspan="3">{{ data.item["Perks 5"] }}</td>
                </tr>
                <tr>
                    <td colspan="3">{{ data.item["Perks 6"] }}</td>
                </tr>
            </table>
        </template>