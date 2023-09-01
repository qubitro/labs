import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { getData, init } from "@qubitro/client";
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Card } from "./components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import MapPin from "@geist-ui/icons/mapPin";
import { renderToString } from "react-dom/server";
import { useToast } from "./components/ui/use-toast";

const calculateCenter = (
  latLonList: { latitude: number; longitude: number }[]
): [number, number] => {
  let totalLat = 0;
  let totalLon = 0;
  const numPoints = latLonList?.length;

  for (const latLon of latLonList) {
    !Number.isNaN(latLon?.latitude)
      ? (totalLat += Number(latLon?.latitude))
      : false;
    !Number.isNaN(latLon?.longitude)
      ? (totalLon += Number(latLon?.longitude))
      : false;
  }

  const centerLat = totalLat / numPoints;
  const centerLon = totalLon / numPoints;

  return [centerLat || 0, centerLon || 0];
};
function App() {
  const { toast } = useToast();
  const DEVICE_ID = "";
  const PROJECT_ID = "";
  const API_KEY = "";
  useEffect(() => {
    init({ apikey: API_KEY });
  }, []);
  const [deviceData, setDeviceData] = useState<
    { LATITUDE?: string; LONGITUDE?: string; time: string }[]
  >([]);
  const [center, setCenter] = useState<[number, number]>([0, 0]);
  const fetchApi = () => {
    init({ apikey: API_KEY });

    getData(PROJECT_ID, DEVICE_ID, 1, dataCount)
      .then((data) => {
        data.map((item) => {
          const date = new Date(item.time);
          const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date
            .getDate()
            .toString()
            .padStart(2, "0")} ${date
            .getHours()
            .toString()
            .padStart(2, "0")}:${date
            .getMinutes()
            .toString()
            .padStart(2, "0")}:${date
            .getSeconds()
            .toString()
            .padStart(2, "0")}`;
          item.time = formattedDate;
        });
        setDeviceData(data);
        const latLonList = data.map((item) => {
          return {
            latitude: Number(item.LATITUDE),
            longitude: Number(item.LONGITUDE),
          };
        });
        setCenter(calculateCenter(latLonList));
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      });
  };
  const svgIcon = L.divIcon({
    html: renderToString(<MapPin />),
    className: "svg-icon",
    iconSize: [24, 40],
    iconAnchor: [12, 40],
  });
  const [dataCount, setDataCount] = useState(50);
  return (
    <div>
      <h1 className="text-2xl mb-5 mt-5">
        SenseCAP T1000 Data Visualization Demo
      </h1>
      <div className="flex items-end mb-4">
        <div>
          <Tabs
            defaultValue="50"
            value={dataCount.toString()}
            onValueChange={(value) => setDataCount(parseInt(value))}
          >
            <TabsList>
              <TabsTrigger value="50">50</TabsTrigger>
              <TabsTrigger value="100">100</TabsTrigger>
              <TabsTrigger value="150">150</TabsTrigger>
              <TabsTrigger value="200">200</TabsTrigger>
              <TabsTrigger value="1000">1000</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Button className="ml-5" onClick={fetchApi}>
          Fetch data
        </Button>
      </div>

      <div
        className="flex flex-row"
        style={{
          width: "100%",
          height: "calc(100vh - 200px)",
        }}
      >
        <Card className="h-full w-1/2 p-1">
          <MapContainer
            className="!rounded-lg"
            center={center}
            zoom={7}
            key={deviceData.length === 0 ? 0 : 1}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {deviceData.map((data, index) => {
              if (data.LATITUDE && data.LONGITUDE) {
                return (
                  <Marker
                    icon={svgIcon}
                    key={index}
                    position={[Number(data.LATITUDE), Number(data.LONGITUDE)]}
                  ></Marker>
                );
              }
            })}
          </MapContainer>
        </Card>
        <Card className="h-full w-1/2 p-1 overflow-scroll">
          {deviceData.length > 0 ? (
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  {Object.keys(deviceData[0]).map((key) => (
                    <TableHead key={key}>{key}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {deviceData.map((data, key) => (
                  <TableRow key={key}>
                    {Object.values(data).map((value) => (
                      <TableCell key={value}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex justify-center items-center h-full">
              No data
            </div>
          )}
        </Card>
      </div>

      {/* <pre>
        <code>{JSON.stringify(deviceData, null, 2)}</code>
      </pre> */}
    </div>
  );
}

export default App;
