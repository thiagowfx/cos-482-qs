package br.ufrj.cos482.repository;

import br.ufrj.cos482.domain.Professor;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Professor entity.
 */
@SuppressWarnings("unused")
public interface ProfessorRepository extends JpaRepository<Professor,Long> {

}
