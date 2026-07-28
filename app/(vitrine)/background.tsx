// "use client";

// import React, { useState } from "react";
// import ReactMapGL, { Marker, Popup, ViewState } from "react-map-gl/mapbox";
// import "mapbox-gl/dist/mapbox-gl.css";

// // Types pour les copropriétés
// type Copro = {
//   id: number;
//   latitude: number;
//   longitude: number;
//   name: string;
//   address?: string;
// };

// // Props du composant
// type BackgroundProps = {
//   copros: Copro[];
//   mapboxToken: string;
//   initialViewState?: ViewState;
//   interactive?: boolean;
//   mapStyle?: string;
//   markerColor?: string;
//   opacity?: number;
// };

// export const Background = ({
//   copros,
//   mapboxToken,
//   initialViewState = {
//     longitude: 2.3522, // Paris par défaut
//     latitude: 48.8566,
//     zoom: 12,
//   },
//   interactive = true,
//   mapStyle = "mapbox://styles/mapbox/streets-v12", // Style par défaut
//   markerColor = "#FF0000", // Rouge par défaut
//   opacity = 1, // Opacité de la carte (1 = 100%)
// }: BackgroundProps) => {
//   const [viewState, setViewState] = useState<ViewState>(initialViewState);
//   const [selectedCopro, setSelectedCopro] = useState<Copro | null>(null);

//   return (
//     <div className="absolute inset-0 -z-10">
//       <ReactMapGL
//         {...viewState}
//         onMove={(evt) => setViewState(evt.viewState)}
//         style={{ width: "100%", height: "100%" }}
//         mapStyle={mapStyle}
//         mapboxAccessToken={mapboxToken}
//         interactive={interactive}
//         opacity={opacity}
//       >
//         {/* Marqueurs pour chaque copro */}
//         {copros.map((copro) => (
//           <Marker
//             key={copro.id}
//             longitude={copro.longitude}
//             latitude={copro.latitude}
//             color={markerColor}
//             onClick={(e) => {
//               e.originalEvent.stopPropagation();
//               setSelectedCopro(copro);
//             }}
//           />
//         ))}

//         {/* Popup pour afficher les détails de la copro sélectionnée */}
//         {selectedCopro && (
//           <Popup
//             longitude={selectedCopro.longitude}
//             latitude={selectedCopro.latitude}
//             onClose={() => setSelectedCopro(null)}
//             closeOnClick={true}
//           >
//             <div>
//               <h3 className="font-bold">{selectedCopro.name}</h3>
//               {selectedCopro.address && (
//                 <p className="text-sm">{selectedCopro.address}</p>
//               )}
//             </div>
//           </Popup>
//         )}
//       </ReactMapGL>
//     </div>
//   );
// };