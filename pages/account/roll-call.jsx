import React, { useState, useEffect, useContext, useRef } from 'react'
import { withProtected } from '@hoc/route'
import dynamic from 'next/dynamic'
import { AuthContext } from '@context/AuthContext'
import axios from 'axios'
import Modal from '@components/Modal/Modal'

const Map = dynamic(() => import('@components/Map/Map'), {ssr: false, loading: () => <p>Loading Map...</p>})

const RollCall = () => {

    const { user } = useContext(AuthContext)

    const vidvieLocation ={latitude: -6.1239371, longitude: 106.7385457}
    const [location, setLocation] = useState({coords: {latitude: 0, longitude: 0, accuracy: 0}, timestamp: new Date()})
    const [showModal, setShowModal] = useState(false)
    const [message, setMessage] = useState('')

    const degToRad = (deg) => {
        return deg * (Math.PI / 180)
    }

    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        let earthRadius = 6371
        let dLat = degToRad(lat2 - lat1)
        let dLon = degToRad(lon2 - lon1)
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2)
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        let distance = earthRadius * c; // Distance in km
        return distance;
    }

    const checkCurrentTime = () => {
        let date = new Date()
        let startTime = '06:00:00'
        let endTime = '18:00:00'
        let s = startTime.split(':')
        let e = endTime.split(':')
        let startDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(s[0]), parseInt(s[1]), parseInt(s[2]))
        let endDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(e[0]), parseInt(e[1]), parseInt(e[2]))
        return date >= startDateTime && date <= endDateTime
    }

    const createRollCall = async (e) => {
        e.preventDefault()
        try {
            let response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/roll_calls`)
            let data = await response.data
            setMessage(data.message)
            setShowModal(true)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(position => {
                setLocation(position)
            }, err => {
                console.error(err)
            }, {
                enableHighAccuracy: true,
                maximumAge: 10000
            })
        }
    }, [])

  return (
    <div>
        <h1 className='title'>Roll Call for {user.username}</h1>
        <div className='map-container'>
            <Map position={[location.coords.latitude, location.coords.longitude]} center={[vidvieLocation.latitude, vidvieLocation.longitude]} zoom={16} message={`${user.name ? user.name : user.username}'s Location`} scrollWheelZoom={true}/>
        </div>
        <p>{location.timestamp ? (new Date(location.timestamp)).toLocaleString() : null}</p>
        <p>{`Distance to VIDVIE Indonesia : ${Math.floor(getDistanceFromLatLonInKm(vidvieLocation.latitude, vidvieLocation.longitude, location.coords.latitude, location.coords.longitude) * 1000)} m`}</p>
        {Math.floor(getDistanceFromLatLonInKm(vidvieLocation.latitude, vidvieLocation.longitude, location.coords.latitude, location.coords.longitude) * 1000) <= 10 && checkCurrentTime()  ? <button className='primary-btn' onClick={e => createRollCall(e)}>Roll Call</button> : null}
        <Modal type="success" message={message} showModal={showModal} onClose={() => setShowModal(false)}/>
    </div>
  )
}

export default withProtected(RollCall)