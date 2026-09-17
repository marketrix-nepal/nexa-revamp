import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.js';
import { crmRouter } from './routes/crm.js';
import { pillarsRouter } from './routes/pillars.js';
import { discoveryRouter } from './routes/discovery.js';
import { automationRouter } from './routes/automation.js';
import { usersRouter } from './routes/users.js';
import { auditLogger } from './middleware/audit.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Global Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://nexa-revamp.pages.dev'],
  credentials: true
}));
app.use(express.json());

// Immutable Regulatory & Operational Audit Trail Middleware
app.use(auditLogger);

// Mount Modular API Routes
app.use('/api/auth', authRouter);
app.use('/api/crm', crmRouter);
app.use('/api/pillars', pillarsRouter);
app.use('/api/discovery', discoveryRouter);
app.use('/api/automation', automationRouter);
app.use('/api/users', usersRouter);

// Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OPERATIONAL',
    system: 'NEXA GROWTH Internal Operational Engine',
    headquarters: 'Auckland, New Zealand',
    hub: 'Singapore',
    timestamp: new Date().toISOString()
  });
});

// Central 404 & Error Handlers
app.use((req, res) => {
  res.status(404).json({ error: 'ENDPOINT_NOT_FOUND', path: req.originalUrl });
});

app.use((err, req, res, next) => {
  console.error('[NEXA OPERATIONAL API ERROR]', err);
  res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: err.message });
});

// Start Server if run directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[NEXA GROWTH] Internal Operational Engine online on port ${PORT}`);
    console.log(`[API GATEWAY] http://localhost:${PORT}/api/health`);
  });
}

export default app;
