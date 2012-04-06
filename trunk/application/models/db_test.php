<?php

class DB_test extends CI_Model {

	public function __construct()
	{
		$this->load->database();
	}
	
	public function get($table_name)
	{
		$q = $this->db->get($table_name);
		if($q->num_rows()>0)
		{
			return $q->result_array();
		}
		else
		{
			return array('no results.');
		}
	}

}

/* End of file db_test.php */
/* Location: ./application/models/db_test.php */