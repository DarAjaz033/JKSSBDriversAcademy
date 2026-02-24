# JKSSB Drivers Academy

A comprehensive online learning platform for JKSSB Drivers exam preparation with admin panel, course management, and payment integration.

## Features

### For Students
- User authentication (Email and Phone)
- Browse and purchase courses
- Access study materials (PDFs)
- Take practice tests
- Track learning progress
- Mobile-responsive design

### For Admins
- Complete admin panel
- Course creation and management
- PDF upload and organization
- Practice test creation from Excel files
- Purchase tracking and analytics
- Real-time statistics dashboard

## Tech Stack

- **Frontend:** HTML, CSS, TypeScript
- **Build Tool:** Vite
- **Backend:** Firebase
  - Authentication
  - Firestore Database
  - Cloud Storage
- **Payment Gateway:** Cashfree (configurable)
- **Icons:** Lucide Icons

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password and Phone)
   - Enable Firestore Database
   - Enable Cloud Storage
   - Copy your Firebase configuration to `firebase-config.ts`

4. Run development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Project Structure

```
project/
├── admin-*.html/ts          # Admin panel pages
├── course-purchase.html/ts  # Course purchase flow
├── my-courses.html/ts       # User's purchased courses
├── practice-test.html/ts    # Practice test viewer
├── profile.html/ts          # User profile
├── admin-service.ts         # Admin operations
├── auth-service.ts          # Authentication
├── payment-service.ts       # Payment integration
├── excel-parser.ts          # Excel file parsing
└── firebase-config.ts       # Firebase configuration
```

## Admin Panel

Access the admin panel at `/admin-login.html`

**Default admin email:** `admin@jkssb.com`

For detailed admin instructions, see [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)

### Admin Features:
1. **Dashboard** - View statistics and quick actions
2. **Courses** - Create, edit, and delete courses
3. **PDFs** - Upload study materials and link to courses
4. **Practice Tests** - Create tests from Excel templates
5. **Purchases** - Track all transactions

## Payment Integration

### Test Mode (Default)
The system uses simulated payments for testing. No actual payment gateway is required.

### Production Setup
To enable Cashfree payments:
1. Sign up at [Cashfree](https://www.cashfree.com/)
2. Get your credentials
3. Update `payment-service.ts`
4. Replace `simulatePayment()` with `initiateCashfreePayment()`

## Database Schema

### Firestore Collections:

**courses**
- Course information, pricing, and linked resources

**pdfs**
- Study material metadata and storage URLs

**practiceTests**
- Test questions, options, and correct answers

**purchases**
- Transaction history and user enrollments

## Firebase Security

Configure Firestore and Storage security rules in Firebase Console. Sample rules are provided in [ADMIN_GUIDE.md](./ADMIN_GUIDE.md).

## Excel Template for Practice Tests

Download the template from the admin panel or use this format:

| Question | Option 1 | Option 2 | Option 3 | Option 4 | Correct Answer | Explanation |
|----------|----------|----------|----------|----------|----------------|-------------|
| Q text   | Option A | Option B | Option C | Option D | 2              | Optional    |

- Correct Answer: Use 1, 2, 3, or 4 for the corresponding option

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Adding New Admins

Edit `admin-service.ts`:
```typescript
const ADMIN_EMAILS = ['admin@jkssb.com', 'new-admin@example.com'];
```

## Mobile Support

The app is fully responsive and works as a Progressive Web App (PWA) on mobile devices.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

All rights reserved.

## Support

For issues or questions, refer to [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) for troubleshooting.

## Features Roadmap

- [ ] Advanced analytics
- [ ] Student progress tracking
- [ ] Certificate generation
- [ ] Email notifications
- [ ] Bulk operations for courses
- [ ] Video content support
