const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const k = parts[0].trim();
    const v = parts.slice(1).join('=').trim().replace(/['"]/g, '');
    env[k] = v;
  }
});

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('1. Supabase Config:');
console.log('   URL:', url || 'NOT SET');
console.log('   Key:', key ? key.substring(0, 15) + '...' : 'NOT SET');

if (!url || !key) {
  console.log('Supabase is NOT configured.');
  process.exit(1);
}

const supabase = createClient(url, key);

async function check() {
  console.log('\n2. Remote Database Table Status:');

  const { data: pData, error: pErr } = await supabase.from('partner_inquiries').select('*').limit(1);
  if (pErr) {
    console.log('   [partner_inquiries]: FAILED ->', pErr.message, `(${pErr.code})`);
  } else {
    console.log('   [partner_inquiries]: CONNECTED & READY! (Rows:', pData.length, ')');
  }

  const { data: sData, error: sErr } = await supabase.from('student_submissions').select('*').limit(1);
  if (sErr) {
    console.log('   [student_submissions]: FAILED ->', sErr.message, `(${sErr.code})`);
  } else {
    console.log('   [student_submissions]: CONNECTED & READY! (Rows:', sData.length, ')');
  }

  const { data: cData, error: cErr } = await supabase.from('contact_messages').select('*').limit(1);
  if (cErr) {
    console.log('   [contact_messages]: FAILED ->', cErr.message, `(${cErr.code})`);
  } else {
    console.log('   [contact_messages]: CONNECTED & READY! (Rows:', cData.length, ')');
  }

  console.log('\n3. Email (Resend) Config:');
  console.log('   RESEND_API_KEY:', env.RESEND_API_KEY ? 'Configured' : 'NOT SET (Mock mode)');
}

check().catch(console.error);
