import dns from 'dns';
import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/trinetra';

  // Some Windows networks refuse Node's default DNS resolver for the SRV
  // lookup that mongodb+srv:// requires, even though the OS resolver works
  // fine. Forcing public DNS servers avoids that "querySrv ECONNREFUSED".
  if (uri.startsWith('mongodb+srv://')) {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  }

  await mongoose.connect(uri);
  console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
};
