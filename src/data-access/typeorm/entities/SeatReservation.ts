import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Seat } from "./Seat.ts";
import { ShowTime } from "./ShowTime.ts";
import { Reservation } from "./reservation.ts";

@Entity()
export class SeatReservation {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Seat, (seat) => seat.seatReservations)
    seat!: Seat;

    @ManyToOne(() => ShowTime, (showTime) => showTime.seatReservations)
    showTime!: ShowTime;

    @ManyToOne(() => Reservation, (reservation) => reservation.seatReservations, { onDelete: 'CASCADE' })
    reservation!: Reservation;
}