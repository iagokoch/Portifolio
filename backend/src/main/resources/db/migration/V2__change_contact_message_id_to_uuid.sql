-- change_contact_message_id_to_uuid

ALTER TABLE contact_message DROP COLUMN id;

ALTER TABLE contact_message
ADD COLUMN id UUID DEFAULT gen_random_uuid() PRIMARY KEY;