package br.ufrj.cos482.service.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;


/**
 * A DTO for the AlunoMestrado entity.
 */
public class AlunoMestradoDTO implements Serializable {

    private Long id;


    private Long diplomaGraduacaoId;
    
    private Long certidaoConclusaoId;
    
    private Long certidaoColacaoId;
    
    private Long alunoId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDiplomaGraduacaoId() {
        return diplomaGraduacaoId;
    }

    public void setDiplomaGraduacaoId(Long documentoSistemaId) {
        this.diplomaGraduacaoId = documentoSistemaId;
    }

    public Long getCertidaoConclusaoId() {
        return certidaoConclusaoId;
    }

    public void setCertidaoConclusaoId(Long documentoSistemaId) {
        this.certidaoConclusaoId = documentoSistemaId;
    }

    public Long getCertidaoColacaoId() {
        return certidaoColacaoId;
    }

    public void setCertidaoColacaoId(Long documentoSistemaId) {
        this.certidaoColacaoId = documentoSistemaId;
    }

    public Long getAlunoId() {
        return alunoId;
    }

    public void setAlunoId(Long alunoId) {
        this.alunoId = alunoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AlunoMestradoDTO alunoMestradoDTO = (AlunoMestradoDTO) o;

        if ( ! Objects.equals(id, alunoMestradoDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "AlunoMestradoDTO{" +
            "id=" + id +
            '}';
    }
}
