export async function createBooking(dataSend) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/booking/${localStorage.getItem(
        'SessionId'
      )}/create`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataSend),
      }
    );
    const data = await response.json();
    if (data.request.status === 'OK') {
      localStorage.removeItem('SessionId');
    }
    console.log('asd', data.booking.id);
    return data.booking.id;
  } catch (error) {
    console.error('Error creating booking:', error);
  }
}

export async function updateBooking(bookingId, status = 'PAID') {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/booking/update`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          status,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error update booking:', error);
  }
}
