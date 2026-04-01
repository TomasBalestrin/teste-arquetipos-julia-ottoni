-- Alterar constraint de current_step para permitir até 13
ALTER TABLE test_sessions DROP CONSTRAINT IF EXISTS test_sessions_current_step_check;
ALTER TABLE test_sessions ADD CONSTRAINT test_sessions_current_step_check
  CHECK (current_step >= 1 AND current_step <= 13);
