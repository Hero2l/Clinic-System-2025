// for main page only
// admin page might be more complex so need to do other way

export const apiClient = {
  async getPromotions() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/promotions`);
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  },
  async getPatients() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patients`);
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  },
  async postPromotion(payload: any) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/promotions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to post');
    return res.json();
  },
};