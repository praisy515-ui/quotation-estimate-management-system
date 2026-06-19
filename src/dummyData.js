// Professional Mock Data for Glory Simon Interiors QAEMS

export const initialCustomers = [
  { id: 'CUST-001', name: 'Sophia Loren', email: 'sophia.loren@example.com', phone: '+1 (555) 019-2834', address: '742 Evergreen Terrace, Springfield', projectType: 'Residential', budget: '$45,000', status: 'Active' },
  { id: 'CUST-002', name: 'Marcus Aurelius', email: 'marcus@philosophy.org', phone: '+1 (555) 021-9876', address: '12 Imperial Way, Rome', projectType: 'Commercial', budget: '$120,000', status: 'Active' },
  { id: 'CUST-003', name: 'Serena Williams', email: 'serena@tennisqueen.com', phone: '+1 (555) 045-6712', address: '98 Court Side Dr, Palm Beach', projectType: 'Residential', budget: '$85,000', status: 'Pending Approval' },
  { id: 'CUST-004', name: 'Elon Musk', email: 'elon@spacex.com', phone: '+1 (555) 420-6969', address: '1 Rocket Rd, Hawthorne', projectType: 'Commercial', budget: '$250,000', status: 'Active' },
  { id: 'CUST-005', name: 'Emma Watson', email: 'emma@books.co.uk', phone: '+1 (555) 077-3312', address: '42 Library Lane, Oxford', projectType: 'Residential', budget: '$35,000', status: 'Completed' },
];

export const initialEnquiries = [
  { id: 'ENQ-201', customerName: 'Alexander Hamilton', email: 'alex@treasury.gov', phone: '+1 (555) 177-1789', projectType: 'Residential', roomType: 'Home Office & Library', status: 'New', date: '2026-06-10' },
  { id: 'ENQ-202', customerName: 'Clara Oswald', email: 'clara.oswald@tardis.net', phone: '+1 (555) 909-1111', projectType: 'Residential', roomType: 'Living Room', status: 'Contacted', date: '2026-06-08' },
  { id: 'ENQ-203', customerName: 'Bruce Wayne', email: 'bruce@wayneent.com', phone: '+1 (555) 911-0007', projectType: 'Commercial', roomType: 'Executive Office Suite', status: 'Proposal Sent', date: '2026-06-05' },
  { id: 'ENQ-204', customerName: 'Diana Prince', email: 'diana@themiscera.org', phone: '+1 (555) 300-1984', projectType: 'Residential', roomType: 'Penthouse Lounge', status: 'New', date: '2026-06-11' },
];

export const initialSiteVisits = [
  { id: 'SV-301', customerName: 'Sophia Loren', address: '742 Evergreen Terrace', scheduledDate: '2026-06-15', scheduledTime: '10:00 AM', assignedDesigner: 'Elena Vance', status: 'Scheduled' },
  { id: 'SV-302', customerName: 'Marcus Aurelius', address: '12 Imperial Way', scheduledDate: '2026-06-18', scheduledTime: '02:30 PM', assignedDesigner: 'Marcus Aurelius (Lead)', status: 'Scheduled' },
  { id: 'SV-303', customerName: 'Serena Williams', address: '98 Court Side Dr', scheduledDate: '2026-06-09', scheduledTime: '11:00 AM', assignedDesigner: 'Elena Vance', status: 'Completed' },
  { id: 'SV-304', customerName: 'Alexander Hamilton', address: '32 Wall St', scheduledDate: '2026-06-22', scheduledTime: '01:00 PM', assignedDesigner: 'Dorian Gray', status: 'Scheduled' },
];

export const initialQuotations = [
  { id: 'QT-401', customerName: 'Sophia Loren', projectType: 'Residential', date: '2026-06-02', roomsCount: 2, subtotal: 35000, tax: 6300, discount: 2000, grandTotal: 39300, status: 'Approved' },
  { id: 'QT-402', customerName: 'Elon Musk', projectType: 'Commercial', date: '2026-06-09', roomsCount: 4, subtotal: 180000, tax: 32400, discount: 10000, grandTotal: 202400, status: 'Sent' },
  { id: 'QT-403', customerName: 'Serena Williams', projectType: 'Residential', date: '2026-06-11', roomsCount: 1, subtotal: 45000, tax: 8100, discount: 3000, grandTotal: 50100, status: 'Draft' },
];

export const initialProjects = [
  { id: 'PRJ-501', name: 'Sophia Loren - Cozy Residence', customer: 'Sophia Loren', type: 'Residential', progress: 75, startDate: '2026-05-01', endDate: '2026-07-15', status: 'In Progress' },
  { id: 'PRJ-502', name: 'Marcus Aurelius - Office Sanctuary', customer: 'Marcus Aurelius', type: 'Commercial', progress: 30, startDate: '2026-05-20', endDate: '2026-09-30', status: 'In Progress' },
  { id: 'PRJ-503', name: 'Emma Watson - Reading Corner', customer: 'Emma Watson', type: 'Residential', progress: 100, startDate: '2026-04-10', endDate: '2026-05-30', status: 'Completed' },
  { id: 'PRJ-504', name: 'Elon Musk - Mars HQ Lounge', customer: 'Elon Musk', type: 'Commercial', progress: 10, startDate: '2026-06-01', endDate: '2026-12-01', status: 'Planning' },
];

export const initialMaterials = [
  { id: 'MAT-601', name: 'Calacatta Gold Marble', category: 'Flooring / Countertops', quality: 'Luxury', unitPrice: '$85 / Sq.ft', stockStatus: 'In Stock' },
  { id: 'MAT-602', name: 'Walnut Hardwood', category: 'Flooring', quality: 'Premium', unitPrice: '$28 / Sq.ft', stockStatus: 'In Stock' },
  { id: 'MAT-603', name: 'Brushed Brass Trims', category: 'Hardware', quality: 'Premium', unitPrice: '$12 / piece', stockStatus: 'Low Stock' },
  { id: 'MAT-604', name: 'Belgian Linen Drapes', category: 'Fabrics', quality: 'Luxury', unitPrice: '$45 / yard', stockStatus: 'In Stock' },
  { id: 'MAT-605', name: 'Polished Concrete Polish', category: 'Finishes', quality: 'Standard', unitPrice: '$8 / Sq.ft', stockStatus: 'In Stock' },
  { id: 'MAT-606', name: 'Terrazzo Tiles', category: 'Flooring', quality: 'Premium', unitPrice: '$35 / Sq.ft', stockStatus: 'Out of Stock' },
];

export const initialVendors = [
  { id: 'VND-701', name: 'Elite Stone & Marble Imports', contactPerson: 'Giuseppe Rossi', phone: '+1 (555) 987-1234', category: 'Stone & Masonry', rating: 4.9, status: 'Active' },
  { id: 'VND-702', name: 'Noble Lumber Mills', contactPerson: 'Sarah Jenkins', phone: '+1 (555) 234-5678', category: 'Wood & Millwork', rating: 4.7, status: 'Active' },
  { id: 'VND-703', name: 'Luxe Lighting Co.', contactPerson: 'Arthur Pendelton', phone: '+1 (555) 345-6789', category: 'Fixtures & Electrical', rating: 4.8, status: 'Active' },
  { id: 'VND-704', name: 'Velvet Threads Textiles', contactPerson: 'Lucia Moreno', phone: '+1 (555) 456-7890', category: 'Upholstery & Fabrics', rating: 4.5, status: 'Under Review' },
];

export const initialPayments = [
  { id: 'INV-801', customerName: 'Sophia Loren', amount: '$15,000', date: '2026-05-15', status: 'Paid', method: 'Wire Transfer' },
  { id: 'INV-802', customerName: 'Marcus Aurelius', amount: '$36,000', date: '2026-06-01', status: 'Pending', method: 'Net 30' },
  { id: 'INV-803', customerName: 'Emma Watson', amount: '$10,500', date: '2026-05-28', status: 'Paid', method: 'Credit Card' },
  { id: 'INV-804', customerName: 'Elon Musk', amount: '$75,000', date: '2026-06-10', status: 'Overdue', method: 'Direct Deposit' },
];

export const initialApprovals = [
  { id: 'APP-901', customerName: 'Sophia Loren', designName: 'Living Room Concept Layout', submittedDate: '2026-06-01', status: 'Approved', comments: 'Beautiful wood finishes selected.' },
  { id: 'APP-902', customerName: 'Marcus Aurelius', designName: 'Executive Office 3D Renderings', submittedDate: '2026-06-08', status: 'Pending', comments: 'Needs more lighting in the reading corner.' },
  { id: 'APP-903', customerName: 'Serena Williams', designName: 'Master Suite Moodboard', submittedDate: '2026-06-11', status: 'Submitted', comments: 'Waiting for client review.' },
];

export const initialNotifications = [
  { id: 1, text: 'Sophia Loren approved the "Living Room Concept Layout".', type: 'success', time: '2 hours ago', read: false },
  { id: 2, text: 'New site visit scheduled for Marcus Aurelius on June 18th.', type: 'info', time: '4 hours ago', read: false },
  { id: 3, text: 'Invoice INV-804 for Elon Musk is now 2 days overdue.', type: 'danger', time: '1 day ago', read: true },
  { id: 4, text: 'Material stock alert: "Brushed Brass Trims" is running low.', type: 'warning', time: '2 days ago', read: true },
];

export const initialActivities = [
  { id: 1, user: 'Elena Vance (Designer)', action: 'Uploaded Living Room Concept Layout', target: 'Sophia Loren Residence', time: '10:45 AM' },
  { id: 2, user: 'Admin', action: 'Approved Quotation QT-401', target: 'Sophia Loren', time: '09:30 AM' },
  { id: 3, user: 'Dorian Gray (Designer)', action: 'Scheduled site visit', target: 'Alexander Hamilton', time: 'Yesterday' },
  { id: 4, user: 'System', action: 'Sent invoice INV-802', target: 'Marcus Aurelius', time: '2 days ago' },
];

export const initialPortfolioItems = [
  {
    id: 'PORT-001',
    title: 'Modern Classic Living Room',
    category: 'Living Room',
    description: 'An elegant living space combining Calacatta marble elements, warm walnut panels, and luxury brass details.',
    client: 'Sophia Loren',
    beforeImg: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&q=80&w=600', // Empty room / raw wall
    afterImg: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600', // Beautiful luxury living room
    testimonial: '"Glory Simon Interiors transformed our empty, sterile living space into a warm, inviting masterpiece of design. The team was professional, detail-oriented, and respected our budget." - Sophia Loren'
  },
  {
    id: 'PORT-002',
    title: 'Minimalist Chef Kitchen',
    category: 'Kitchen',
    description: 'A sleek kitchen layout utilizing matte charcoal cabinetry, integrated lighting, and white quartz countertops.',
    client: 'Emma Watson',
    beforeImg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600', // Messy/old kitchen
    afterImg: 'https://images.unsplash.com/photo-1556911220-bda9f7f7597e?auto=format&fit=crop&q=80&w=600', // Beautiful modern kitchen
    testimonial: '"Working with Glory Simon Interiors was an absolute dream. They managed to create a spacious, highly functional chef kitchen within a relatively small area." - Emma Watson'
  },
  {
    id: 'PORT-003',
    title: 'Imperial Executive Suite',
    category: 'Office',
    description: 'A luxurious office sanctuary built with custom mahogany shelving, leather wall panels, and indirect accent lighting.',
    client: 'Marcus Aurelius',
    beforeImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600', // Empty commercial floor
    afterImg: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=600', // Ultra sleek modern conference room
    testimonial: '"An office that inspires focus and clarity. The design respects historical classicism while being completely equipped for modern corporate workflows." - Marcus Aurelius'
  }
];
