import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import EachNotifications from './components/EachNotifications';
import { global_styles } from '../../styles/global';
const notifications =
    [
        {
            "userID": null,
            "email": null,
            "notificationID": 10261,
            "notificationMessage": "A new product has been added to our platform a.. Order now and get unlimited bonus.",
            "readAt": 0,
            "actionURL": "/products/10069",
            "isArchived": 0,
            "isDeleted": 0,
            "createdAt": "2023-09-25T16:45:34.000Z",
            "notificationType": "launched-new-product",
            "notificationTitle": "New product launched",
            "isFromAdmin": 1,
            "issuedBy": null,
            "images": "",
            "priority": null
        },
        {
            "userID": null,
            "email": null,
            "notificationID": 10260,
            "notificationMessage": "A new product has been added to our platform a.. Order now and get unlimited bonus.",
            "readAt": 0,
            "actionURL": "/products/10068",
            "isArchived": 0,
            "isDeleted": 0,
            "createdAt": "2023-09-25T07:40:36.000Z",
            "notificationType": "launched-new-product",
            "notificationTitle": "New product launched",
            "isFromAdmin": 1,
            "issuedBy": null,
            "images": "https://ahaliyasdeensquare.com/upload/products/10073/1695605969508-145189.webp",
            "priority": null
        },
        {
            "userID": null,
            "email": null,
            "notificationID": 10255,
            "notificationMessage": "A new product has been added to our platform a.. Order now and get unlimited bonus.",
            "readAt": 0,
            "actionURL": "/products/10067",
            "isArchived": 0,
            "isDeleted": 0,
            "createdAt": "2023-09-18T17:25:07.000Z",
            "notificationType": "launched-new-product",
            "notificationTitle": "New product launched",
            "isFromAdmin": 1,
            "issuedBy": null,
            "images": "https://ahaliyasdeensquare.com/upload/products/10072/1695036110869-884587356.webp",
            "priority": null
        },
        {
            "userID": null,
            "email": null,
            "notificationID": 10254,
            "notificationMessage": "A new product has been added to our platform a.. Order now and get unlimited bonus.",
            "readAt": 0,
            "actionURL": "/products/10066",
            "isArchived": 0,
            "isDeleted": 0,
            "createdAt": "2023-09-18T13:19:45.000Z",
            "notificationType": "launched-new-product",
            "notificationTitle": "New product launched",
            "isFromAdmin": 1,
            "issuedBy": null,
            "images": "https://ahaliyasdeensquare.com/upload/products/10071/1695019519775-163960882.webp",
            "priority": null
        },
        {
            "userID": null,
            "email": null,
            "notificationID": 10252,
            "notificationMessage": "A new product has been added to our platform a.. Order now and get unlimited bonus.",
            "readAt": 0,
            "actionURL": "/products/10065",
            "isArchived": 0,
            "isDeleted": 0,
            "createdAt": "2023-09-10T21:16:34.000Z",
            "notificationType": "launched-new-product",
            "notificationTitle": "New product launched",
            "isFromAdmin": 1,
            "issuedBy": null,
            "images": "https://ahaliyasdeensquare.com/upload/products/10069/1694358868351-683266895.webp",
            "priority": null
        },
        {
            "userID": null,
            "email": null,
            "notificationID": 10251,
            "notificationMessage": "A new product has been added to our platform a.. Order now and get unlimited bonus.",
            "readAt": 0,
            "actionURL": "/products/10064",
            "isArchived": 0,
            "isDeleted": 0,
            "createdAt": "2023-09-10T21:05:52.000Z",
            "notificationType": "launched-new-product",
            "notificationTitle": "New product launched",
            "isFromAdmin": 1,
            "issuedBy": null,
            "images": "https://ahaliyasdeensquare.com/upload/products/10067/1694358342601-103588913.webp",
            "priority": null
        },
        {
            "userID": null,
            "email": null,
            "notificationID": 10250,
            "notificationMessage": "A new product has been added to our platform a.. Order now and get unlimited bonus.",
            "readAt": 0,
            "actionURL": "/products/10063",
            "isArchived": 0,
            "isDeleted": 0,
            "createdAt": "2023-09-08T23:28:26.000Z",
            "notificationType": "launched-new-product",
            "notificationTitle": "New product launched",
            "isFromAdmin": 1,
            "issuedBy": null,
            "images": "https://ahaliyasdeensquare.com/upload/products/10066/1694194082788-437533855.webp",
            "priority": null
        },
        {
            "userID": null,
            "email": null,
            "notificationID": 10249,
            "notificationMessage": "A new product has been added to our platform a.. Order now and get unlimited bonus.",
            "readAt": 0,
            "actionURL": "/products/10062",
            "isArchived": 0,
            "isDeleted": 0,
            "createdAt": "2023-09-08T23:22:20.000Z",
            "notificationType": "launched-new-product",
            "notificationTitle": "New product launched",
            "isFromAdmin": 1,
            "issuedBy": null,
            "images": "https://ahaliyasdeensquare.com/upload/products/10065/1694193731811-243497165.webp",
            "priority": null
        },
        {
            "userID": null,
            "email": null,
            "notificationID": 10248,
            "notificationMessage": "A new product has been added to our platform a.. Order now and get unlimited bonus.",
            "readAt": 0,
            "actionURL": "/products/10061",
            "isArchived": 0,
            "isDeleted": 0,
            "createdAt": "2023-09-08T22:59:30.000Z",
            "notificationType": "launched-new-product",
            "notificationTitle": "New product launched",
            "isFromAdmin": 1,
            "issuedBy": null,
            "images": "https://ahaliyasdeensquare.com/upload/products/10063/1694192350347-605963160.webp",
            "priority": null
        },
        {
            "userID": null,
            "email": null,
            "notificationID": 10247,
            "notificationMessage": "A new product has been added to our platform a.. Order now and get unlimited bonus.",
            "readAt": 0,
            "actionURL": "/products/10060",
            "isArchived": 0,
            "isDeleted": 0,
            "createdAt": "2023-09-08T22:30:11.000Z",
            "notificationType": "launched-new-product",
            "notificationTitle": "New product launched",
            "isFromAdmin": 1,
            "issuedBy": null,
            "images": "https://ahaliyasdeensquare.com/upload/products/10061/1694190600886-533466325.webp",
            "priority": null
        },

    ]
export default function NotificationsScreen() {
    return (
        <SafeAreaView style={global_styles.container}>
            {
                notifications?.map((notification, index) => {
                    return (
                        <EachNotifications notification={notification} key={index} />
                    )
                })
            }

        </SafeAreaView>
    );
}

