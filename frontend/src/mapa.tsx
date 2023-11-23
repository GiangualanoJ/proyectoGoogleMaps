import { GoogleMap, Marker } from '@react-google-maps/api';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

interface PuntoDeInteres {
    _id: string | null;
    lat: number | null;
    lng: number | null;
}

const Mapa: React.FC = () => {

    let emptyPunto: PuntoDeInteres = {
        _id: null,
        lat: null,
        lng: null,
    };

    const [mapas, setMapas] = useState(null);
    const [mapa, setMapa] = useState([]);
    const [_Id, set_Id] = useState(null)
    const [address, setAddress] = useState<string>("");
    const defaultCenter = { lat: -34.5838200, lng: -60.9433200 };
    const [puntosDeInteres, setPuntosDeInteres] = useState<PuntoDeInteres[]>([]);
    const [puntos, setPuntos] = useState<PuntoDeInteres>(emptyPunto);
    const [selectedPlace, setSelectedPlace] = useState<{ lat: number, lng: number } | null>(null);
    const [cursorStyle, setCursorStyle] = useState<string>("grab");
    const [dialog, setDialog] = useState<boolean>(false);
    const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [puntoDialog, setPuntoDialog] = useState<boolean>(false);
    const [selectedLocation, setSelectedLocation] = useState<PuntoDeInteres | null>(null);
    const [selectedMarker, setSelectedMarker] = useState<PuntoDeInteres | null>(null);
    const toast = useRef<Toast>(null);


    useEffect(() => {
        getMapa()
    }, [])

    const getMapa = async () => {
        try {
            const response = await axios.get('http://localhost:3000/maps');
            const data = response.data;

            if (data && Array.isArray(data)) {
                setPuntosDeInteres(data);
            }
        } catch (error) {
            console.error('Error al obtener puntos de interés:', error);
        }

    }

    const savePunto = async (m: PuntoDeInteres) => {
        try {
            const response = await axios.post('http://localhost:3000/maps/nuevaUbicacion', m);
            setPuntosDeInteres([...puntosDeInteres, response.data]);
        } catch (error) {
            console.log(error);
        }
    }

    const deletePunto = async (m: PuntoDeInteres) => {
        try {
            await axios.delete(`http://localhost:3000/maps/${m._id}`);
            setPuntosDeInteres(prevPuntos => prevPuntos.filter((puntoDeInteres) => puntoDeInteres._id !== m._id));
        } catch (error) {
            console.log(error);
        }
    }
    

    const mapStyles: React.CSSProperties = {
        height: "70vh",
        width: "100%",
        padding: "2rem",
        marginTop: "2rem",
    }

    const handleClick = async (event: google.maps.MouseEvent) => {
        try {
            if (event && event.latLng) {
                const nuevoPunto = {
                    _id: null,
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                };
                await savePunto(nuevoPunto);
            }
        } catch (error) {
            console.error('Error al crear punto:', error);
        }
    }

    const handleSelect = async (selectedAddress: string) => {
        setAddress(selectedAddress);

        try {
            const results = await geocodeByAddress(selectedAddress);
            const latLng = await getLatLng(results[0]);
            console.log(latLng);
            setSelectedPlace(latLng);
            setCursorStyle("pointer");

            /* Setear el lugar seleccionado para su posible guardado */
            setSelectedLocation({
                _id: null,
                lat: latLng.lat,
                lng: latLng.lng,
            });
        } catch (e) {
            console.log(e);
        }
    }

    const handleGuardar = () => {
        if (selectedLocation) {
            setDialog(true);
        }
    };

    const handleConfirmGuardar = () => {
        if (selectedLocation) {
            savePunto(selectedLocation);
            setDialog(false);
        }
    };

    const handleCancelarGuardar = () => {
        setSelectedLocation(null);
        setDialog(false);
    };

    const handleMarkerClick = (punto: PuntoDeInteres) => {
        setSelectedMarker(punto);
        setDeleteDialog(true);
    };

    const handleConfirmDelete = () => {
        if (selectedMarker) {
            deletePunto(selectedMarker);
            setDeleteDialog(false);
            setSelectedMarker(null);
        }
    };

    const handleCancelDelete = () => {
        setDeleteDialog(false);
        setSelectedMarker(null);
    };

    const markers = puntosDeInteres.map((punto, index) => (
        <Marker
            key={index}
            position={{ lat: punto.lat || 0, lng: punto.lng || 0 }}
            onClick={() => handleMarkerClick(punto)}
        />
    ));

    const deleteDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="mr-2" onClick={handleCancelDelete} />
            <Button label="Sí" icon="pi pi-check" className="p-button-danger" onClick={handleConfirmDelete} />
        </React.Fragment>
    );

    const DialogFooter = (
        <React.Fragment>
            <div className='grid justify-content-center align-items-center'>
                <Button label="Save" icon="pi pi-check" type='button' onClick={handleConfirmGuardar} rounded />
                <Button label="Cancel" icon="pi pi-times" outlined rounded onClick={handleCancelarGuardar} className='mt-2' />
            </div>
        </React.Fragment>
    );

    return (
        <div>

            <div>
                <PlacesAutocomplete
                    value={address}
                    onChange={setAddress}
                    onSelect={handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div className='grid justify-content-center align-items-center'>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-search" />
                                        <InputText {...getInputProps({
                                            placeholder: "Search"
                                        })} />
                                    </span>
                                </div>
                                <div style={{ marginLeft: '10px' }}>
                                    <Button label="Guardar" rounded raised icon="pi pi-bookmark" onClick={handleGuardar} />
                                </div>
                            </div>
                            <div className="suggestions-container">
                                {loading ? <div>Cargando...</div> : null}
                                <div className="sugerencias-container">
                                    {loading && <div>Cargando...</div>}
                                    {suggestions.map((suggestion, index) => (
                                        <div
                                            {...getSuggestionItemProps(suggestion)}
                                            key={index}
                                            className="sugerencia-item"
                                            style={{ cursor: cursorStyle }}
                                            onMouseEnter={() => setCursorStyle("pointer")}
                                            onMouseLeave={() => setCursorStyle("grab")}
                                        >
                                            {suggestion.description}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
            </div>


            <div className="flex justify-content-center">
                <Dialog header="Google Maps" visible={deleteDialog} onHide={() => setDeleteDialog(false)} footer={deleteDialogFooter}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        <span>Seguro quieres eliminar el <b>punto de interés</b>?</span>
                    </div>
                </Dialog>
            </div>
            <div className="flex justify-content-center">
                <Dialog header="Google Maps" visible={dialog} onHide={() => setDialog(false)} footer={DialogFooter}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        <span>¿Deseas guardar este <b>punto de interés</b>?</span>
                    </div>
                </Dialog>
            </div>
            <div style={{ cursor: cursorStyle }}>
                <Toast ref={toast} />
                <GoogleMap center={selectedPlace ? selectedPlace : defaultCenter} mapContainerStyle={mapStyles} zoom={13} onClick={handleClick}>
                    {markers}
                </GoogleMap>
            </div>
        </div>
    )
}

export default Mapa;

