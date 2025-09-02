import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <div className="">
          <p>Vip cars</p>
          <div>
            <a href="/vip/registro">Registrate</a>
          </div>
          <div>
            <a href="/vip/reservar">Reserva un viaje</a>
          </div>
        </div>
      </main>
    </div>
  );
}
