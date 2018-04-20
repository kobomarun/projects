<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pipeline extends CI_Controller {

	public function Login()
	{
		$username = $this->input->post('username');
		$password = md5($this->input->post('pass'));
		$query =  $this->db->get_where('lg_users',array('phone'=>$username, 'pwd'=>$password));
		if($query->num_rows() == 1) {

		 $row =  $query->row_array();
		 //get business name
		 $bname = $this->db->get_where('firms',array('phone'=>$row['phone']))->row()->name;
		 
		 //get total tax paid by customer
		 $q = $this->db->get_where('payment',array('phone'=>$row['phone']))->result();
		 $total_sum=0;
		 
		 foreach($q as $p) {
		 	 $total_sum+=$p->price;
		 }
		 
		 //get total tax Collected by Revenue officer
		 $qu = $this->db->get_where('payment',array('officer_id'=>$row['id']))->result();
		 $total_sums=0;
		 foreach($qu as $pr) {
		 	 $total_sums+=$pr->price;
		 }
		 $userSessionData = array(
			 'id' => $row['id'],
			 'fname' => $row['fname'],
			 'lname' => $row['lname'],
			 'phone' => $row['phone'],
			 'type' => $row['type'],
			 'bname'=>$bname,
			 'ctotal'=>$total_sum,
			 'dtotal'=>$total_sums,
			 'isLoggedIn' => true
		 );

		 echo json_encode($userSessionData);
	 }
	 else {
			echo json_encode('error');
		}
	}

	public function checkBusisnessExist()
	{
		$phone = $this->input->post('phone');

		$query =  $this->db->get_where('firms',array('phone'=>$phone));
		if($query->num_rows() == 1) {

		 $row =  $query->row_array();
		 //$bname = $this->db->get_where('firms', array('phone'=>$phone))->row()->name;
		 $phoneSession= array(
			 'phone' => $row['phone'],
			 'bname' => $row['name']
		 );

		 $this->session->set_userdata($phoneSession);
		 echo json_encode($phoneSession);
	 }
	 else {
			echo json_encode('error');
		}
	}


	public function viewcomplaints()
	{
		$phone = $this->input->post('phone');

		$query =  $this->db->get_where('firms',array('phone'=>$phone));
		$rows =  $query->result();
		if(!empty($rows)) { 

		 
		$complain = $this->db->get_where('complain', array('userid'=>$phone))->result();
		foreach($complain as $row) {
			$msg =  array(
			'title'=>$row->title,
			'message'=>$row->message,
			'status'=>$row->status,
			'cid'=>$row->cid
			);
			
			
		 
		}
		echo json_encode($complain);

		 

		 
	 }
	 else {
			echo ('error');
		}
	}


	public function addBusiness() {


		$data = array(
			'name'=>$this->input->post('name'),
			'address'=>$this->input->post('address'),
			'category'=>$this->input->post('category'),
			'phone'=>$this->input->post('phone'),
			'city'=>$this->input->post('city'),
			'lg'=>$this->input->post('lg'),
			'date'=>date("j-m-Y"),
			'type'=>$this->input->post('type'),
			'cname'=>$this->input->post('cname'),
			'officer_id'=>$this->input->post('id')
			
		);

		$query =  $this->db->get_where('firms',array('phone'=>$this->input->post('phone')));
		if($query->num_rows() == 1) {
			echo json_encode('error');
			return false;
			exit;
		} else {
		$data2 = array(
		'pwd'=>md5($this->input->post('pwd')),
		'phone'=>$this->input->post('phone'),
		'fname'=>$this->input->post('cname'),
		'date'=>date("j-m-Y"),
		'location'=>$this->input->post('city'),
		'type'=>2
		);
		$this->db->insert('lg_users',$data2);

		$insert = $this->db->insert('firms', $data);
		if($insert) {
			return true;
		} else {
			return false;
		}
	}
}

public function addPayment() {
	$data = array(
		'phone'=>$this->input->post('bphone'),
		'business_name'=>$this->input->post('bname'),
		'price'=>$this->input->post('tamount'),
		'tariffName'=>$this->input->post('tname'),
		'mode_of_payment'=>$this->input->post('p_method'),
		'officer_id'=>$this->input->post('officer_id'),
		'year'=>date("Y"),
		'date'=>date("j-m-Y"),
		'lg'=>1
	);

	$insert = $this->db->insert('payment', $data);
	if($insert) {
		echo json_encode('true');
		} else {
			echo json_encode('error');
		}
	}

	public function verifyPayment() {
		$phone = $this->input->post('phone');
		$year = date("Y");
		$query = $this->db->get_where('payment',array('phone'=>$phone, 'year'=>$year));
		$rows = $query->result();
		
			$count=1;
			if(!empty($rows)){
			foreach($rows as $row) {
			echo"<tr>";
			echo "<td>".$count++ ."</td>";
	                echo "<td>" . $row->tariffName . "</td>";
	                echo "<td>".$row->date."</td>";
	                echo "<td>" . $row->price . "</td>";
	                echo "</tr>";

			}
		  } else { echo "error"; }
		  
		
					
	}
					

		public function addComplain() {
			$data = array(
				'title'=>$this->input->post('title'),
				'message'=>$this->input->post('msg'),
				'cid'=>$this->input->post('random'),
				'date'=>date("j-m-Y"),
				'userid'=>$this->input->post('phone'),
				'status'=>0
			);

			$insert = $this->db->insert('complain', $data);
			if($insert) {
				echo json_encode('true');
				} else {
					echo json_encode('error');
				}
			}
	
	public function getBusinessListing() {
		$query = $this->db->get('firms')->result();
		$count = 1;
		foreach($query as $row) {
		echo"<tr>";
		echo "<td>".$count++ ."</td>";
                echo "<td>" . $row->name . "</td>";
                echo "</tr>";
		}
	}
	
	public function getNews() {
		$query = $this->db->get('news')->result();
		$count = 1;
		foreach($query as $row) {
		echo "<button class='accordion accordion ui-btn ui-shadow ui-corner-all'>" .$row->title. "</button>";
	          echo "<div class='panel' style='display: block;'>";
	            echo "<p>" . $row->content ."</p>";
	        echo " </div>";
		}
	}
	
	
	public function getAllTariff() {
		$query = $this->db->get('tariff')->result();
		$count = 1;
		foreach($query as $row) {
		echo "<option value=".$row->tariff.":".$row->price.">".$row->tariff."</option>";
		}
	}


}
